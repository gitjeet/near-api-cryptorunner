import { assert, near } from "near-sdk-js";
import { Token, TokenMetadata } from "./metadata";
import { internalAddTokenToOwner, refundDeposit } from "./internal";
import { Contract } from "./contract";

export function internalMint({
  contract,
  tokenId,
  metadata,
  receiverId,
}: {
  contract: Contract;
  tokenId: string;
  metadata: TokenMetadata;
  receiverId: string;
}): void {
  let initialStorageUsage = near.storageUsage();

  let token = new Token({
    ownerId: receiverId,
  });

  assert(!contract.tokensById.containsKey(tokenId), "Token already exists");
  contract.tokensById.set(tokenId, token);

  contract.tokensMetadataById.set(tokenId, metadata);

  internalAddTokenToOwner(contract, token.ownerId, tokenId);

  let requiredStorageInBytes =
    near.storageUsage().valueOf() - initialStorageUsage.valueOf();

  refundDeposit(requiredStorageInBytes);
}
