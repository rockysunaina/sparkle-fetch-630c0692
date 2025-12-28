import { SymbolsResponse, ExpiryResponse, OptionChainResponse } from "@/types/optionChain";

const BASE_URL = "https://runalgo.xyz/data";

export async function fetchSymbols(): Promise<string[]> {
  try {
    const response = await fetch(`${BASE_URL}/getSymbols.php`, {
      headers: {
        "accept": "*/*",
        "content-type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch symbols");
    }
    
    const data: SymbolsResponse = await response.json();
    return data.symbols || [];
  } catch (error) {
    console.error("Error fetching symbols:", error);
    throw error;
  }
}

export async function fetchExpiryDates(symbol: string): Promise<ExpiryResponse> {
  try {
    const encodedSymbol = encodeURIComponent(symbol);
    const response = await fetch(`${BASE_URL}/getExpiryDates2.php?symbol=${encodedSymbol}`, {
      headers: {
        "accept": "*/*",
        "content-type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch expiry dates");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching expiry dates:", error);
    throw error;
  }
}

export async function fetchOptionChainData(
  symbol: string,
  expiry: string,
  strikeCount: number = 10
): Promise<OptionChainResponse> {
  try {
    const encodedSymbol = encodeURIComponent(symbol);
    const url = `${BASE_URL}/calculateStrikeDataWithStrikeCount.php?symbol=${encodedSymbol}&expiry=${expiry}&StrikeCount=${strikeCount}`;
    
    const response = await fetch(url, {
      headers: {
        "accept": "*/*",
        "content-type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch option chain data");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching option chain data:", error);
    throw error;
  }
}
