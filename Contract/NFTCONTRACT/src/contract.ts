import {
  NearBindgen,
  call,
  view,
  LookupMap,
  AccountId,
  UnorderedSet,
  UnorderedMap,
  initialize,
  near,
  Vector,
} from "near-sdk-js";
import {
  JsonToken,
  NFTAuction,
  NFTAuctionContractMetadata,
  NFTAuctionMetadata,
  Token,
  TokenMetadata,
} from "./metadata";
import { internalMint } from "./mint";
import { internalNftTokensForOwner } from "./token";
import { internalMakeBid } from "./auction";

@NearBindgen({})
export class Contract {
  owner_id: string = "";
  metadata: NFTAuctionContractMetadata = {
    spec: "nft-auction-1.0.0",
    name: "NFT Mint and Bid",
    symbol: "NFTAUC",
  };
  tokensByOwner = new LookupMap<Vector<string>>("tokensByOwner");
  tokensById = new LookupMap<Token>("tokensById");
  tokensMetadataById = new UnorderedMap<TokenMetadata>("tokensMetadataById");

  auctionsById = new LookupMap<NFTAuction>("auctionsById");
  auctionsMetadataById = new UnorderedMap<NFTAuctionMetadata>(
    "auctionsMetadataById"
  );

  @initialize({ privateFunction: true })
  init({
    owner_id,
    metadata,
  }: {
    owner_id: string;
    metadata?: NFTAuctionContractMetadata;
  }) {
    this.owner_id = owner_id;
    this.metadata = metadata;
  }

  // Mint NFT
  @call({ payableFunction: true })
  nft_mint({
    token_id,
    metadata,
    receiver_id,
  }: {
    token_id: string;
    metadata: TokenMetadata;
    receiver_id: string;
  }) {
    return internalMint({
      contract: this,
      tokenId: token_id,
      metadata: metadata,
      receiverId: receiver_id,
    });
  }

  // View NFTs for a given account_id
  @view({})
  nft_tokens_for_owner({
    account_id,
    from_index,
    limit,
  }: {
    account_id: AccountId;
    from_index?: number;
    limit?: number;
  }) {
    return internalNftTokensForOwner({
      contract: this,
      accountId: account_id,
      fromIndex: from_index,
      limit,
    });
  }

  @call({ payableFunction: true })
  make_bid({ auction_id }: { auction_id: string }) {
    return internalMakeBid({
      contract: this,
      auctionId: auction_id,
    });
  }
}
