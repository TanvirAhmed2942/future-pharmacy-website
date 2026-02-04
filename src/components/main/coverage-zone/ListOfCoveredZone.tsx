"use client";
import React, { useMemo, useState } from "react";
import { useGetCoverageZipcodeQuery } from "@/store/Apis/mapApi/pharmapApi";
import zipcodeRange from "./zipcoderange.json";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";

const STATE_NAMES: Record<string, string> = {
    AL: "Alabama",
    AK: "Alaska",
    AZ: "Arizona",
    AR: "Arkansas",
    CA: "California",
    CO: "Colorado",
    CT: "Connecticut",
    DE: "Delaware",
    DC: "District of Columbia",
    FL: "Florida",
    GA: "Georgia",
    HI: "Hawaii",
    ID: "Idaho",
    IL: "Illinois",
    IN: "Indiana",
    IA: "Iowa",
    KS: "Kansas",
    KY: "Kentucky",
    LA: "Louisiana",
    ME: "Maine",
    MD: "Maryland",
    MA: "Massachusetts",
    MI: "Michigan",
    MN: "Minnesota",
    MS: "Mississippi",
    MO: "Missouri",
    MT: "Montana",
    NE: "Nebraska",
    NV: "Nevada",
    NH: "New Hampshire",
    NJ: "New Jersey",
    NM: "New Mexico",
    NY: "New York",
    NC: "North Carolina",
    ND: "North Dakota",
    OH: "Ohio",
    OK: "Oklahoma",
    OR: "Oregon",
    PA: "Pennsylvania",
    RI: "Rhode Island",
    SC: "South Carolina",
    SD: "South Dakota",
    TN: "Tennessee",
    TX: "Texas",
    UT: "Utah",
    VT: "Vermont",
    VA: "Virginia",
    WA: "Washington",
    WV: "West Virginia",
    WI: "Wisconsin",
    WY: "Wyoming",
};

const ranges = zipcodeRange as Record<string, string[]>;

function getStateForZip(zip: string): string | null {
    const z = zip.padStart(5, "0").slice(0, 5);
    for (const [state, range] of Object.entries(ranges)) {
        const [min, max] = range;
        if (min != null && max != null && z >= min && z <= max) return state;
    }
    return null;
}

function ListOfCoveredZone() {
    const { data: coverageData } = useGetCoverageZipcodeQuery(
        { limit: 10000 },
        { refetchOnMountOrArgChange: true }
    );

    const coverageByState = useMemo(() => {
        const zips = coverageData?.data?.length
            ? coverageData.data.map((item) => item.zipCode)
            : [];
        const byState: Record<string, string[]> = {};
        for (const zip of zips) {
            const state = getStateForZip(zip);
            const key = state ?? "Other";
            if (!byState[key]) byState[key] = [];
            if (!byState[key].includes(zip)) byState[key].push(zip);
        }
        for (const arr of Object.values(byState)) arr.sort();
        return byState;
    }, [coverageData?.data]);

    const stateKeys = useMemo(
        () => Object.keys(coverageByState).sort((a, b) => (a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b))),
        [coverageByState]
    );

    const totalZips = useMemo(
        () => Object.values(coverageByState).reduce((s, arr) => s + arr.length, 0),
        [coverageByState]
    );

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value.replace(/\D/g, "").slice(0, 5);
        setSearchQuery(raw);
    };

    const filteredByState = useMemo(() => {
        const query = searchQuery.trim();
        if (!query) {
            return Object.fromEntries(stateKeys.map((k) => [k, coverageByState[k]]));
        }
        const result: Record<string, string[]> = {};
        for (const stateKey of stateKeys) {
            const zips = coverageByState[stateKey].filter((zip) =>
                zip.padStart(5, "0").startsWith(query)
            );
            if (zips.length > 0) result[stateKey] = zips;
        }
        return result;
    }, [coverageByState, stateKeys, searchQuery]);

    const filteredStateKeys = useMemo(
        () => Object.keys(filteredByState).sort((a, b) => (a === "Other" ? 1 : b === "Other" ? -1 : a.localeCompare(b))),
        [filteredByState]
    );

    const filteredTotal = useMemo(
        () => Object.values(filteredByState).reduce((s, arr) => s + arr.length, 0),
        [filteredByState]
    );

    return (
        <div className="">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Our Coverage zones
                    </h1>

                    {totalZips > 0 && (
                        <p className="mt-2 text-sm text-gray-500">
                            {totalZips} zip code{totalZips !== 1 ? "s" : ""} in coverage
                        </p>
                    )}
                </div>

                <div className="mb-6">
                    <label htmlFor="zip-search" className="sr-only">
                        Search by zip code
                    </label>
                    <Input
                        id="zip-search"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={5}
                        placeholder="Search by 5-digit zip code"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="max-w-xs font-mono tracking-widest"
                        aria-label="Search by zip code (5 digits)"
                    />
                    {searchQuery.length > 0 && (
                        <p className="mt-1.5 text-sm text-gray-500">
                            Showing {filteredTotal} zip code{filteredTotal !== 1 ? "s" : ""} matching &quot;{searchQuery}&quot;
                        </p>
                    )}
                </div>

                {filteredStateKeys.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                        {searchQuery
                            ? `No zip codes match "${searchQuery}". Try a different search.`
                            : "No coverage data loaded."}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredStateKeys.map((stateKey) => {
                            const zips = filteredByState[stateKey];
                            const stateName = stateKey === "Other" ? "Other" : (STATE_NAMES[stateKey] ?? stateKey);
                            const stateLabel = stateKey === "Other" ? "Other" : `${stateName} – ${stateKey}`;
                            return (
                                <section
                                    key={stateKey}
                                    className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                                >
                                    <div className="flex items-center gap-3 px-5 py-4 bg-[#f3ecf3] border-b border-[#f3ecf3]">
                                        <div className="flex h-9 w-9 items-start justify-center rounded-lg bg-peter/10 text-peter">
                                            <MapPin className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {stateLabel}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                {zips.length} zip code{zips.length !== 1 ? "s" : ""}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <ul className="flex flex-wrap gap-2">
                                            {zips.map((zip, i) => (
                                                <li
                                                    key={`${stateKey}-${zip}-${i}`}
                                                    className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-800"
                                                >
                                                    {zip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListOfCoveredZone;
