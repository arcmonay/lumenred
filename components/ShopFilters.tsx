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
    <div className="flex flex-col gap-6">
      <ol className="m-0 list-none border-l border-[rgba(209,69,47,0.45)] p-0">
        <li>
          <button
            type="button"
            onClick={() => update({ collection: "all" })}
            className={`block w-full py-2 pl-4 text-left ${
              active === "all" ? "text-[var(--ink)]" : "text-[var(--ink-faint)]"
            }`}
          >
            <span className="mr-3 text-[0.72rem] tracking-[0.14em] text-[var(--ember)]">00</span>
            Full protocol
          </button>
        </li>
        {collections.map((c, i) => (
          <li key={c.handle}>
            <button
              type="button"
              onClick={() => update({ collection: c.handle })}
              className={`block w-full py-2 pl-4 text-left ${
                active === c.handle ? "text-[var(--ink)]" : "text-[var(--ink-faint)]"
              }`}
            >
              <span className="mr-3 text-[0.72rem] tracking-[0.14em] text-[var(--ember)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {c.title}
            </button>
          </li>
        ))}
      </ol>
      <label className="block w-full">
        <span className="sr-only">Search products</span>
        <input
          type="search"
          defaultValue={q}
          placeholder="Search wavelength, panel, mask…"
          onChange={(e) => update({ q: e.target.value })}
          className="w-full border-0 border-b border-[var(--line)] bg-transparent px-0 py-2 text-sm outline-none placeholder:text-[var(--ink-faint)] focus:border-[var(--ember)]"
        />
      </label>
    </div>
  );
}
