import './NFTRarity.css'
import React, { useEffect, useState } from "react";
import { NftProvider, useNft } from "use-nft" 

export default function NFTRarity() {
  const { loading, error, nft } = useNft(
    "0x9992477b1b486e4a0c8ae6d34eb1389a5f8d3dd9",
    "351"
  )
  const currentStyle= "red";
  // nft.loading is true during load.
  if (loading) return <>Loading…</>
  // nft.error is an Error instance in case of error.
  if (error || !nft) return <>Error.</>
  return (
    <section>
      <h1>{nft.name}</h1>
      <div class={currentStyle}>
        <img src={nft.image} alt="" />
      </div>
      <p>{nft.description}</p>
      <p>Owner: {nft.owner}</p>
      <p>Metadata URL: {nft.metadataUrl}</p>
      <p>RawData: {JSON.stringify(nft.rawData)}</p>
    </section>
  )
}