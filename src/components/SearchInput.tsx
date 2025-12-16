"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const [value, setValue] = useState(searchParams.get("q") ?? "");
	const [currentPath, setCurrentPath] = useState(pathname);

	useEffect(() => {
		if (pathname !== currentPath) {
			setValue("");
			setCurrentPath(pathname);
		}
	}, [pathname, currentPath]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());

			if (value) {
				params.set("q", value);
			} else {
				params.delete("q");
			}

			if (pathname === "/") {
				router.replace(`/?${params.toString()}`);
			}
		}, 400);

		return () => clearTimeout(timeout);
	}, [value, router, searchParams, pathname]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	return (
		<div className="relative">
			<IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
			<input
				type="search"
				value={value}
				onChange={handleChange}
				placeholder="Search products..."
				className="w-full rounded-lg border bg-gray-50 py-2 pl-10 pr-4 text-sm"
			/>
		</div>
	);
};

export default SearchInput;
