import { assert, near } from "near-sdk-js";
import { Contract } from "./contract";

export function internalMakeBid({
  contract,
  auctionId,
}: {
  contract: Contract;
  auctionId: string;
}) {
  let amount = near.attachedDeposit().valueOf();

  // Check if account balance is more than bid amount
  const balance = near.accountBalance().valueOf();
  assert(balance >= amount, "Account balance is less than bid amount");

  // Check if Bid amount is more than current highest bid
  let auctionMetadata = contract.auctionsMetadataById.get(auctionId);
  assert(
    amount > auctionMetadata.currentHighestBid,
    "Bid amount is less than current highest bid"
  );

  // Check if auction has not ended
  const timestamp = near.blockTimestamp().valueOf();
  assert(
    timestamp - auctionMetadata.startTime < auctionMetadata.interval,
    "Auction has ended"
  );

  if (auctionMetadata.auctionStarted) {
    // Return the funds to the previous bid, as we have better bid
    const promise = near.promiseBatchCreate(auctionMetadata.currentWinner);
    near.promiseBatchActionTransfer(promise, auctionMetadata.currentHighestBid);
  }
  let updatedAuctionMetadata = { ...auctionMetadata };
  updatedAuctionMetadata.auctionStarted = true;
  updatedAuctionMetadata.currentHighestBid = amount;
  updatedAuctionMetadata.bidders.push(near.predecessorAccountId());
  updatedAuctionMetadata.currentWinner = near.predecessorAccountId();
  updatedAuctionMetadata.bidsByAccount.set(near.predecessorAccountId(), amount);

  contract.auctionsMetadataById.set(auctionId, updatedAuctionMetadata);
}
