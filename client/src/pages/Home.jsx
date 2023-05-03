import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";

import Card from "../components/Card";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

const RenderCards = ({ data, title }) => {
	if (data?.length > 0) {
		return data.map((post) => <Card {...post} key={post._id} />);
	}

	return (
		<h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">
			{title}
		</h2>
	);
};

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [allPosts, setAllPosts] = useState(null);
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState(null);
	const [searchTimeout, setSearchTimeout] = useState(null);

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);
		setSearchTimeout(
			setTimeout(() => {
				const searchResults = allPosts.filter(
					(item) =>
						item.name
							.toLowerCase()
							.includes(searchText.toLowerCase()) ||
						item.prompt
							.toLowerCase()
							.includes(searchText.toLowerCase())
				);
				setSearchResults(searchResults);
			}, 500)
		);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					"https://ai-image-smoky.vercel.app/api/v1/posts",
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Access-Control-Allow-Origin":
								"https://ai-image-smoky.vercel.app",
						},
					}
				);

				if (response.ok) {
					const result = await response.json();

					setAllPosts(result.data.reverse());
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);
	return (
		<section>
			<Banner
				title="Generated Images Showcase"
				subtitle=" Browse through a collection of imaginative and visually stunning images generated by DALL-E- AI"
			/>
			<div className="mt-16 flex flex-row items-end">
				<div className="w-full">
					<FormField
						labelName="Search Posts"
						type="text"
						name="text"
						placeholder="Search posts ..."
						value={searchText}
						handleChange={handleSearchChange}
					/>
				</div>
				<button
					className="font-inter font-medium bg-red-200 text-white ml-3 px-4 py-3.5 text-sm rounded-md"
					onClick={() => setSearchText("")}>
					Clear
				</button>
			</div>
			<div className="mt-10">
				{loading ? (
					<div className="flex justify-center items-cen">
						<Loader />
					</div>
				) : (
					<>
						{searchText && (
							<h2 className="font-medium text-[#666e75] text-xl mb-3">
								Showing results for{" "}
								<span className="text-[#222328]">
									{searchText}
								</span>
							</h2>
						)}
					</>
				)}
			</div>
			{/* IMAGES */}
			<div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
				{searchText ? (
					<RenderCards
						data={searchResults}
						title="No search results found"
					/>
				) : (
					<RenderCards data={allPosts} title="No posts found" />
				)}
			</div>
		</section>
	);
};

export default Home;
