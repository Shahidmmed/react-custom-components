import React, {useEffect, useState} from 'react';
import arrowr from '../../assets/icons/arrowr.png';
import arrowl from '../../assets/icons/arrowl.png';

const Paginate = ({data, RenderComponent, pageLimit, dataLimit, componentProps}) => {
	const [pages, setPages] = useState(Math.ceil(data.length / dataLimit));
	const [currentPage, setCurrentPage] = useState(1);
	const [paginationGroup, setPaginationGroup] = useState([]);

	useEffect(() => {
		setPages(Math.ceil(data.length / dataLimit));
		setCurrentPage(1);
		setPaginationGroup(getPaginationGroup(1)); // Initialize pagination group with page 1
	}, [data, dataLimit]);

	function hasMore() {
		let lastItem = paginationGroup[paginationGroup.length - 1];
		let lastDataItem = Math.ceil(data.length / dataLimit);
		return lastItem < lastDataItem;
	}

	function moreNext() {
		const nextPage = paginationGroup[paginationGroup.length - 1] + 1;
		setPaginationGroup(getPaginationGroup(nextPage));
		setCurrentPage(nextPage);
	}

	function morePrev() {
		const prevPage = paginationGroup[0] - 1;
		setPaginationGroup(getPaginationGroup(prevPage));
		setCurrentPage(prevPage);
	}

	function goToNextPage() {
		const nextPage = currentPage + 1;
		setPaginationGroup(getPaginationGroup(nextPage));
		setCurrentPage(nextPage);
	}

	function goToPreviousPage() {
		const prevPage = currentPage - 1;
		setPaginationGroup(getPaginationGroup(prevPage));
		setCurrentPage(prevPage);
	}

	function changePage(event) {
		const pageNumber = Number(event.target.textContent);
		setPaginationGroup(getPaginationGroup(pageNumber));
		setCurrentPage(pageNumber);
	}

	const getPaginatedData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return data.slice(startIndex, endIndex);
	};

	const getPaginationGroup = (current) => {
		const groupPageLimit = Math.min(pageLimit, pages);
		const middle = Math.floor(groupPageLimit / 2);
		let start = current - middle;
		start = Math.max(start, 1);
		start = Math.min(start, pages - groupPageLimit + 1);

		return new Array(groupPageLimit).fill(0).map((_, idx) => start + idx);
	};

	if (pages === 1) {
		// Render only the component without pagination
		return (
			<RenderComponent
				data={getPaginatedData()}
				onItemClick={(e) => {
					componentProps(e);
				}}
			/>
		);
	}

	return (
		<>
			<RenderComponent
				data={getPaginatedData()}
				onItemClick={(e) => {
					componentProps(e);
				}}
			/>

			<div className='pagination'>
				{data.length > 0 && (
					<nav className='text-center'>
						<button disabled={currentPage === 1 || pages === 1} onClick={goToPreviousPage} className='pagination-btn prev'>
							<img src={arrowl} alt='arrow-left' className='paginate-arrow' />
						</button>

						{pages > 1 && (
							<>
								{paginationGroup[0] > 1 && (
									<button onClick={morePrev} className='pagination-btn pagination-more'>
										<span>...</span>
									</button>
								)}

								{paginationGroup.map((item, index) => (
									<button key={index} onClick={changePage} className={currentPage === item ? 'pagination-btn active' : 'pagination-btn'}>
										<span>{item}</span>
									</button>
								))}

								{hasMore() && (
									<button onClick={moreNext} className='pagination-btn pagination-more'>
										<span>...</span>
									</button>
								)}
							</>
						)}

						<button onClick={goToNextPage} className='pagination-btn next' disabled={currentPage === pages || pages === 1}>
							<img src={arrowr} alt='arrow-right' className='paginate-arrow' />
						</button>
					</nav>
				)}
			</div>
		</>
	);
};

export default Paginate;
