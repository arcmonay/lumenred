"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Collection } from "@/lib/types";

export function ShopFilters({ collections }: { collections: Collection[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get("collection") ?? "all";
  const q = params.get("q") ?? "";

  function update(next: { collection?: string; q?: string }) {
    const sp = new URLSearchParams(params.toString());
    const collection = next.collection ?? active;
    const query = next.q ?? q;
    if (!collection || collection === "all") sp.delete("collection");
    else sp.set("collection", collection);
    if (!query) sp.delete("q");
    else sp.set("q", query);
    router.push(`/shop?${sp.toString()}`);
  }

  return (
    <div>
      <div className="spectrum-tabs" role="tablist" aria-label="Collections">
        <button
          type="button"
          className={active === "all" ? "is-on" : ""}
          onClick={() => update({ collection: "all" })}
        >
          All bays
        </button>
        {collections.map((c) => (
          <button
            key={c.handle}
            type="button"
            className={active === c.handle ? "is-on" : ""}
            onClick={() => update({ collection: c.handle })}
          >
            {c.title}
          </button>
        ))}
      </div>
      <label className="block w-full">
        <span className="sr-only">Search products</span>
        <input
          type="search"
          defaultValue={q}
          placeholder="Search wavelength, panel, mask, wrap…"
          onChange={(e) => update({ q: e.target.value })}
          className="search-rail"
        />
      </label>
    </div>
  );
}
