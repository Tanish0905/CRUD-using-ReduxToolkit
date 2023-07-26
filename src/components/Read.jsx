import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showUser } from "../features/userDetailSlice";
import CustomModal from "./CustomModal";
import { deleteUser } from "../features/userDetailSlice";

const Read = () => {
	const dispatch = useDispatch();

	const { users, loading, searchData } = useSelector((state) => state.app);

	const [id, setId] = useState();

	const [radioData, setRadioData] = useState("");

	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		dispatch(showUser());
	}, []);

	if (loading) {
		return <h2>Loading</h2>;
	}

	return (
		<div>
			<h2>All Post</h2>
			<input
				className="form-check-input"
				name="gender"
				checked={radioData === ""}
				type="radio"
				onChange={(e) => setRadioData("")}
			/>
			<label className="form-check-label">All</label>

			<input
				className="form-check-input"
				name="gender"
				value="Male"
				checked={radioData === "Male"}
				type="radio"
				onChange={(e) => setRadioData(e.target.value)}
			/>
			<label className="form-check-label">Male</label>

			<input
				className="form-check-input"
				name="gender"
				value="Female"
				checked={radioData === "Female"}
				type="radio"
				onChange={(e) => setRadioData(e.target.value)}
			/>
			<label className="form-check-label">Female</label>

			{showPopup && (
				<CustomModal
					id={id}
					showPopup={showPopup}
					setShowPopup={setShowPopup}
				/>
			)}
			<div>
				{users &&
					users
						.filter((ele) => {
							if (searchData.length === 0) {
								return ele;
							} else {
								return ele.name
									.toLowerCase()
									.includes(searchData.toLowerCase());
							}
						})

						.filter((ele) => {
							if (radioData === "Male") {
								return ele.gender === "Male"; //return ele.gender === radioData; this will work too
							} else if (radioData === "Female") {
								return ele.gender === "Female"; //return ele.gender === radioData; this will work too
							} else {
								return ele;
							}
						})
						.map((ele) => (
							<div key={ele.id} className="card w-50 mx-auto my-2">
								<div className="card-body">
									<h5 className="card-title">{ele.name}</h5>
									<h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
									<p className="card-text">{ele.gender}</p>
									<button
										className="card-link"
										onClick={() => [setId(ele.id), setShowPopup(true)]}
									>
										View
									</button>
									<Link to={`/edit/${ele.id}`} className="card-link">
										Edit
									</Link>
									<Link
										className="card-link"
										onClick={() => dispatch(deleteUser(ele.id))}
									>
										Delete
									</Link>
								</div>
							</div>
						))}
			</div>
		</div>
	);
};

export default Read;
