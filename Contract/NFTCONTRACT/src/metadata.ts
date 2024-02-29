import { AccountId, LookupMap, UnorderedMap } from "near-sdk-js";
import { Contract } from "./contract";

//defines the payout type we'll be returning as a part of the royalty standards.
export class Payout {
  payout: { [accountId: string]: bigint };
  constructor({ payout }: { payout: { [accountId: string]: bigint } }) {
    this.payout = payout;
  }
}

export class NFTAuctionContractMetadata {
  spec: string;
  name: string;
  symbol: string;
  icon?: string;
  baseUri?: string;
  reference?: string;
  referenceHash?: string;

  constructor({
    spec,
    name,
    symbol,
    icon,
    baseUri,
    reference,
    referenceHash,
  }: {
    spec: string;
    name: string;
    symbol: string;
    icon?: string;
    baseUri?: string;
    reference?: string;
    referenceHash?: string;
  }) {
    this.spec = spec; // required, essentially a version like "nft-1.0.0"
    this.name = name; // required, ex. "Mosaics"
    this.symbol = symbol; // required, ex. "MOSAIC"
    this.icon = icon; // Data URL
    this.baseUri = baseUri; // Centralized gateway known to have reliable access to decentralized storage assets referenced by `reference` or `media` URLs
    this.reference = reference; // URL to a JSON file with more info
    this.referenceHash = referenceHash; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
  }
}

export class TokenMetadata {
  title?: string;
  description?: string;
  media?: string;
  mediaHash?: string;
  copies?: number;
  issuedAt?: string;
  expiresAt?: string;
  startsAt?: string;
  updatedAt?: string;
  extra?: string;
  reference?: string;
  referenceHash?: string;

  constructor({
    title,
    description,
    media,
    mediaHash,
    copies,
    issuedAt,
    expiresAt,
    startsAt,
    updatedAt,
    extra,
    reference,
    referenceHash,
  }: {
    title?: string;
    description?: string;
    media?: string;
    mediaHash?: string;
    copies?: number;
    issuedAt?: string;
    expiresAt?: string;
    startsAt?: string;
    updatedAt?: string;
    extra?: string;
    reference?: string;
    referenceHash?: string;
  }) {
    this.title = title; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
    this.description = description; // free-form description
    this.media = media; // URL to associated media, preferably to decentralized, content-addressed storage
    this.mediaHash = mediaHash; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
    this.copies = copies; // number of copies of this set of metadata in existence when token was minted.
    this.issuedAt = issuedAt; // ISO 8601 datetime when token was issued or minted
    this.expiresAt = expiresAt; // ISO 8601 datetime when token expires
    this.startsAt = startsAt; // ISO 8601 datetime when token starts being valid
    this.updatedAt = updatedAt; // ISO 8601 datetime when token was last updated
    this.extra = extra; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
    this.reference = reference; // URL to an off-chain JSON file with more info.
    this.referenceHash = referenceHash; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
  }
}

export class Token {
  ownerId: string;

  constructor({ ownerId }: { ownerId: string }) {
    this.ownerId = ownerId;
  }
}

// The Json token is what will be returned from view calls.
export class JsonToken {
  tokenId: string;
  ownerId: string;
  metadata: TokenMetadata;

  constructor({
    tokenId,
    ownerId,
    metadata,
  }: {
    tokenId: string;
    ownerId: string;
    metadata: TokenMetadata;
  }) {
    this.tokenId = tokenId;
    this.ownerId = ownerId;
    this.metadata = metadata;
  }
}

export class NFTAuctionMetadata {
  title?: string;
  description?: string;
  interval: bigint; // For How much time does the nft seller want the auction to continue
  minPrice: bigint; // The price of the nft  at which the auction will start
  startTime: bigint; // Timestamp at which the auction will start
  auctionStarted: boolean;
  bidders: AccountId[]; // A collection of all the accounts who have bidded for the nft
  bidsByAccount: LookupMap<bigint>; // A mapping of all the addresses to their bid , so we can return their amount in case their bid did not win nft
  currentHighestBid?: bigint;
  currentWinner?: AccountId;

  constructor({
    title,
    description,
    interval,
    minPrice,
    startTime,
    auctionStarted,
  }: {
    title?: string;
    description?: string;
    interval: bigint;
    minPrice: bigint;
    startTime: bigint;
    auctionStarted: boolean;
  }) {
    this.title = title;
    this.description = description;
    this.interval = interval;
    this.minPrice = minPrice;
    this.startTime = startTime;
    this.auctionStarted = auctionStarted;
  }
}

export class NFTAuction {
  auctionId: string;
  nft: Token;
  seller: AccountId;

  constructor({
    nft,
    seller,
  }: {
    auctionId: string;
    nft: Token;
    seller: AccountId;
  }) {
    this.auctionId = Date.now().toString();
    this.nft = nft;
    this.seller = seller;
  }
}

// get the information for a specific token ID
export function internalNftMetadata({
  contract,
}: {
  contract: Contract;
}): NFTAuctionContractMetadata {
  return contract.metadata;
}
