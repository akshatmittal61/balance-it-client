import { UserApi } from "@/api";
import { Loader } from "@/components";
import { useDebounce, useHttpClient } from "@/hooks";
import { IconButton, Input, MaterialIcon, Typography } from "@/library";
import { useAuthStore } from "@/store";
import { IUser } from "@/types";
import React, { useEffect, useState } from "react";
import { classes } from "./assets";
import { BulkEditor } from "./bulk-editor";
import { MembersUser } from "./member";
import { SplitsPlaceholder } from "./placeholder";
import { MembersWindowProps } from "./types";

export const MembersWindow: React.FC<MembersWindowProps> = ({
	selectedMembers,
	setSelectedMembers,
}) => {
	const { user: loggedInUser } = useAuthStore();
	const [searchResults, setSearchResults] = useState<Array<IUser>>([]);
	const [openBulkEditor, setOpenBulkEditor] = useState(false);
	const { loading: searching, call: api } = useHttpClient<Array<IUser>>([]);
	const [searchStr, debouncedSearchStr, setSearchStr] = useDebounce<string>(
		"",
		1000
	);

	const handleSearch = async (searchStr: any) => {
		const res = await api(UserApi.searchForUsers, searchStr);
		setSearchResults(res);
	};

	const handleSelectUser = (user: IUser) => {
		const isUserSelected = selectedMembers
			.map((user) => user.id)
			.includes(user.id);
		if (isUserSelected) {
			const filteredUser = selectedMembers.filter(
				(u) => u.id !== user.id
			);
			setSelectedMembers(filteredUser);
		} else {
			setSelectedMembers([...selectedMembers, user]);
		}
	};

	useEffect(() => {
		if (debouncedSearchStr && debouncedSearchStr.length >= 3) {
			handleSearch(debouncedSearchStr);
		} else {
			setSearchResults([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSearchStr]);
	return (
		<>
			<div className={classes("-header")}>
				<Typography size="xxl" weight="medium">
					Members
				</Typography>
				<div className={classes("-header-controls")}>
					{!openBulkEditor ? (
						<Input
							name="email"
							placeholder="Search by email"
							size="small"
							value={searchStr}
							onChange={(e: any) => setSearchStr(e.target.value)}
						/>
					) : null}
					<IconButton
						icon={
							<MaterialIcon
								icon={openBulkEditor ? "list" : "email"}
							/>
						}
						title="Bulk Editor"
						type="button"
						onClick={(e: any) => {
							e.preventDefault();
							setOpenBulkEditor((p) => !p);
						}}
					/>
				</div>
			</div>
			{openBulkEditor ? (
				<BulkEditor
					selectedMembers={selectedMembers}
					setSelectedMembers={setSelectedMembers}
				/>
			) : null}
			{debouncedSearchStr.length > 0 ? (
				searching ? (
					<Loader.Spinner />
				) : searchResults.length > 0 ? (
					searchResults.map((user, index) => (
						<MembersUser
							{...user}
							key={`group-manager-searched-user-${user.id}`}
							index={index}
							onSelect={
								loggedInUser && user.id === loggedInUser.id
									? undefined
									: () => handleSelectUser(user)
							}
							isSelected={selectedMembers
								.map((user) => user.id)
								.includes(user.id)}
						/>
					))
				) : (
					<SplitsPlaceholder
						// no user was found, invitation is expected
						loading={false}
						searchStr={searchStr}
						onInvited={(invitedUser) => {
							setSearchResults([invitedUser]);
							handleSelectUser(invitedUser);
						}}
					/>
				)
			) : (
				selectedMembers.map((user, index) => (
					<MembersUser
						{...user}
						key={`group-manager-user-${user.id}`}
						index={index}
						onRemove={
							loggedInUser && user.id === loggedInUser.id
								? undefined
								: () => handleSelectUser(user)
						}
					/>
				))
			)}
		</>
	);
};
