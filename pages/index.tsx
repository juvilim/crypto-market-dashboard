import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Table from "../components/Table";
import Tags from "../components/Tags";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_KEY,
  SortOrder,
  TAGS,
} from "../constants";
import { useAssets } from "../hooks/useAssets";
import { useTickerPriceChange } from "../hooks/useTickerPriceChange";
import { SortingRule, CryptoAsset, CryptoTicker, CryptoData } from "../types";
import { hasKeyword } from "../utils";

const DEFAULT_KEYWORD = "";
const DEFAULT_TAG = TAGS[0].tag;

const Home: NextPage = () => {
  const [keyword, setKeyword] = React.useState<string>(DEFAULT_KEYWORD);
  const [page, setPage] = React.useState(DEFAULT_PAGE);
  const [sort, setSort] = React.useState<SortingRule | undefined>(undefined);
  const [selectedTag, setSelectedTag] = React.useState(DEFAULT_TAG);

  const {
    isLoading: isLoadingAssets,
    data: assetData,
    error: errorAssets,
  } = useAssets({ keyword, selectedTag, sort });

  const assetSymbols = React.useMemo(
    () => [...new Set(assetData?.data?.map((item) => item.symbol))],
    [assetData?.data]
  );

  const {
    isLoading: isLoadingTicker,
    data: tickerData,
    error: errorTicker,
  } = useTickerPriceChange(assetSymbols);

  React.useEffect(() => {
    if (keyword || selectedTag || sort) {
      setPage(DEFAULT_PAGE);
    }
  }, [keyword, selectedTag, sort]);

  const sanitizedData = React.useMemo(() => {
    if (!assetData || !tickerData) return;

    const assets = assetData?.data
      ?.sort((a, b) => (a[DEFAULT_SORT_KEY] > b[DEFAULT_SORT_KEY] ? 1 : -1))
      .map((item) => {
        const { name, fullName, logo, symbol, price, tags } = item;
        return { name, fullName, logo, symbol, price, tags };
      }) as CryptoAsset[];

    const prices = tickerData
      ?.sort((a, b) => (a[DEFAULT_SORT_KEY] > b[DEFAULT_SORT_KEY] ? 1 : -1))
      ?.filter((item) => assetSymbols.indexOf(item.symbol) !== -1)
      .map((item) => ({
        symbol: item.symbol,
        priceChange: Number(item.priceChange),
        priceChangePercent: Number(item.priceChangePercent),
        prevClosePrice: Number(item.prevClosePrice),
        lastPrice: Number(item.lastPrice),
        volume: Number(item.volume),
      })) as CryptoTicker[];

    return assets.map((item, i) => ({ ...item, ...prices[i] })) as CryptoData[];
  }, [assetSymbols, assetData, tickerData]);

  const sortedData = sanitizedData?.slice();
  sortedData?.sort((a, b) => {
    const columnName = sort?.sortBy as keyof CryptoData;
    if (sort?.order === SortOrder.ASC) {
      return a[columnName] > b[columnName] ? 1 : -1;
    } else if (sort?.order === SortOrder.DESC) {
      return a[columnName] < b[columnName] ? 1 : -1;
    } else {
      return 0;
    }
  });

  const filteredData = sortedData?.filter((data) => {
    let bool = true;
    if (keyword && selectedTag !== DEFAULT_TAG) {
      bool =
        hasKeyword([data.name, data.fullName], keyword) &&
        data.tags.some(
          (item) => item.toLowerCase() === selectedTag.toLowerCase()
        );
    } else if (keyword) {
      bool = hasKeyword([data.name, data.fullName], keyword);
    } else if (selectedTag !== DEFAULT_TAG) {
      bool = data.tags.some(
        (item) => item.toLowerCase() === selectedTag.toLowerCase()
      );
    }
    return bool;
  });

  const tableData = React.useMemo(() => {
    if (!filteredData) return;

    const startIndex = (page - 1) * DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + DEFAULT_PAGE_SIZE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page]);

  const handleColumnHeaderClick = (selectedColumn: string) => () => {
    if (!sort || sort?.sortBy !== selectedColumn) {
      setSort({
        sortBy: selectedColumn,
        order: SortOrder.ASC,
      });
    } else if (sort.order === SortOrder.ASC) {
      setSort({
        sortBy: sort.sortBy,
        order: SortOrder.DESC,
      });
    } else {
      setSort(undefined);
    }
  };

  const renderResult = () => {
    if (isLoadingAssets || isLoadingTicker) {
      return (
        <div className="w-full p-8 text-gray-500 text-center">Loading...</div>
      );
    }
    if (errorAssets || errorTicker) {
      return (
        <div className="w-full p-8 text-red-500 text-center">
          {errorAssets || (errorTicker as any)}
        </div>
      );
    }

    if (!tableData || !tableData.length) {
      return (
        <div className="w-full p-8 text-gray-500 text-center">No Result</div>
      );
    }

    const totalPage = Math.ceil(
      (filteredData?.length || 0) / DEFAULT_PAGE_SIZE
    );
    return (
      <>
        <Table
          data={tableData}
          sort={sort}
          onColumnHeaderClick={handleColumnHeaderClick}
        />
        <Pagination page={page} setPage={setPage} totalPage={totalPage} />
      </>
    );
  };

  return (
    <div className="p-4 md:container max-w-5xl mx-auto">
      <Head>
        <title>Crypto Market Dashboard</title>
        <meta
          name="description"
          content="Crypto Market Dashboard using Binance API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="md:flex items-center justify-between">
        <p className="text-2xl font-bold">Markets</p>
        <SearchBar value={keyword} setValue={setKeyword} />
      </div>
      <Tags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
      <div>{renderResult()}</div>
    </div>
  );
};

export default Home;
