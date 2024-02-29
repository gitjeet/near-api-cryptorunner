import { AccountId } from "near-sdk-js";
import { Contract } from "./contract";
import { JsonToken } from "./metadata";
import { internalJsonTokenForTokenId } from "./internal";

export function internalNftTokensForOwner({
  contract,
  accountId,
  fromIndex,
  limit,
}: {
  contract: Contract;
  accountId: AccountId;
  fromIndex?: number;
  limit?: number;
}): JsonToken[] {
  const tokenVector = contract.tokensByOwner.get(accountId);

  if (tokenVector === null) {
    return [];
  }

  let tokens = [];
  let start = fromIndex ? fromIndex : 0;
  let max = limit ? limit : 50;

  for (let i = start; i < start + max; i++) {
    if (i >= 0 && i < tokenVector.length) {
      let token = internalJsonTokenForTokenId({
        contract,
        tokenId: tokenVector[i],
      });
      tokens.push(token);
    }
  }

  return tokens;
}

// export function internalNftTokens({
//   contract,
//   fromIndex,
//   limit,
// }: {
//   contract: Contract;
//   fromIndex?: number;
//   limit?: number;
// }): JsonToken[] {
//   let tokenVector = contract.token;
// }
