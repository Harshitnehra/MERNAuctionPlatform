import cron from "node-cron";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import { Bid } from "../models/bidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import { calculateCommission } from "../controllers/commissionController.js";

export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const nowUTC = new Date();
    console.log(nowUTC);
    
    console.log("Cron for ended auction running...");

    const endedAuctions = await Auction.find({
      endTime: { $lt: nowUTC }, 
      commissionCalculated: false,
    });
    console.log(endedAuctions);

    for (const auction of endedAuctions) {
      try {
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });

        const auctioneer = await User.findById(auction.createdBy);
        if (!auctioneer) {
          console.log("Auctioneer not found for auction:", auction._id);
          continue;
        }

        let commissionAmount = 0;
        if (highestBidder) {
          commissionAmount = await calculateCommission(auction._id);

          const bidder = await User.findById(highestBidder.bidder.id);
          if (bidder) {
            // Update the highest bidder's records
            await User.findByIdAndUpdate(
              bidder._id,
              {
                $inc: {
                  moneySpent: highestBidder.amount,
                  auctionsWon: 1,
                },
              },
              { new: true }
            );

            // Send email notification to the winner
            const subject = `Congratulations! You won the auction for ${auction.title}`;
            const message = `Dear ${
              bidder.userName
            }, \n\nCongratulations! You have won the auction for ${
              auction.title
            }. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email: ${
              auctioneer.email
            } \n\nPlease complete your payment using one of the following methods:\n\n1. **Bank Transfer**: \n- Account Name: ${
              auctioneer.paymentMethods?.bankTransfer?.bankAccountName || "N/A"
            }\n- Account Number: ${
              auctioneer.paymentMethods?.bankTransfer?.bankAccountNumber ||
              "N/A"
            }\n- Bank: ${
              auctioneer.paymentMethods?.bankTransfer?.bankName || "N/A"
            }\n\n2. **Gpay**:\n- You can send payment via Gpay: No is 8398842847\n\n3. **UPI ID**:\n- Send payment to: 8398842847@ybl\n\n4. **Cash on Delivery (COD)**:\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n- To pay the 20% upfront, use any of the above methods.\n- The remaining 80% will be paid upon delivery.\n- If you want to see the condition of your auction item then send your email on this: ${
              auctioneer.email
            }\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nThank you for participating!\n\nBest regards,\nHarshit Nehra Auction Team`;

            console.log("SENDING EMAIL TO HIGHEST BIDDER");
            sendEmail({ email: bidder.email, subject, message });
            console.log("SUCCESSFULLY SENT EMAIL TO HIGHEST BIDDER");

            auction.highestBidder = highestBidder.bidder.id;
          }
        }

        // Update auctioneer's unpaid commission
        await User.findByIdAndUpdate(
          auctioneer._id,
          { $inc: { unpaidCommission: commissionAmount } },
          { new: true }
        );

        // Mark commission as calculated **only after all operations are complete**
        auction.commissionCalculated = true;
        await auction.save();
      } catch (error) {
        console.error("Error in ended auction cron:", error);
      }
    }
  });
};
