import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { IconButton, Button, Typography, Input, Collapse, Card, CardBody, Checkbox } from '@material-tailwind/react';
import { RiArrowUpDownFill } from 'react-icons/ri';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


const fetchProducts = async ({ page = 1, limit = 12, search = '', sortBy = '' }) => {
    const res = await fetch(`http://localhost:3000/products?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const ProductSection = () => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [sortBy, setSortBy] = useState('');


    const toggleOpen = () => setOpen((cur) => !cur);

    //----Get Data with tacstack query
    const { data, error, isLoading } = useQuery({
        queryKey: ['products', active, search, sortBy],
        queryFn: () => fetchProducts({ page: active, limit: 12, search, sortBy }),
        keepPreviousData: true,
    });

    //----Search funtionality
    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleSearchClick = (e) => {
        e.preventDefault();
        setSearch(inputValue);
        setActive(1);
    };
    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setSearch(inputValue);
            setActive(1);
        }
    };

    //----Pagination Functionality
    const next = () => {
        if (active < data?.totalPages) {
            setActive((prev) => prev + 1);
        }
    };
    const prev = () => {
        if (active > 1) {
            setActive((prev) => Math.max(prev - 1, 1));
        }
    };

    //----Sorting functionality
    const handleSortByPrice = () => {
        setSortBy(sortBy === 'priceAsc' ? 'priceDesc' : 'priceAsc');
    };
    const handleSortByDate = () => {
        setSortBy(sortBy === 'dateAsc' ? 'dateDesc' : 'dateAsc');
    };

    //---Data State management
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;


    return (
        <div className='w-11/12 mx-auto'>
            <h2 className='text-3xl font-bold text-center mb-7 text-outlet-secondary font-poppins'>Our Products</h2>
            <section className='shadow-md rounded-xl px-2 border py-4 my-10'>

                <div className='flex justify-between gap-3 flex-col md:flex-row items-center'>
                    {/* Search */}
                    <div className="relative flex min-w-full md:min-w-min md:flex-1 gap-2 md:w-max">
                        <Input
                            type="search"
                            color="black"
                            label="Type here..."
                            className="pr-20"
                            containerProps={{
                                className: "min-w-[300px]",
                            }}
                            value={inputValue}
                            onChange={handleSearchChange}
                            onKeyUp={handleKeyUp}
                        />
                        <Button
                            size="sm"
                            color="white"
                            className="!absolute right-1 top-1 rounded"
                            onClick={handleSearchClick}
                        >
                            Search
                        </Button>
                    </div>

                    {/* Shorting */}
                    <div className='flex justify-end gap-2'>
                        <Button variant='outlined' className='flex items-center gap-1 text-outlet-secondary' onClick={handleSortByPrice}>
                            Price {sortBy === 'priceAsc' ? 'High to Low' : 'Low to High'} <RiArrowUpDownFill />
                        </Button>
                        <Button variant='outlined' className='flex items-center gap-1 text-outlet-secondary' onClick={handleSortByDate}>
                            Date {sortBy === 'dateAsc' ? 'Old to New' : 'New to Old'} <RiArrowUpDownFill />
                        </Button>
                    </div>
                </div>

                {/* Filtering */}
                <div className='mt-3 flex justify-end'>
                    <Button variant='outlined' className='bg-white text-outlet-secondary w-full' onClick={toggleOpen}>Select Category</Button>
                </div>
                <Collapse open={open}>
                    <Card className="my-4 mx-auto w-11/12">
                        <CardBody>
                            <div>
                                <h2>Category:</h2>
                                <Checkbox label="Category 1" />
                                <Checkbox label="Category 2" />
                                <Checkbox label="Category 3" />
                                <Checkbox label="Category 4" />
                                <Checkbox label="Category 5" />
                                <Checkbox label="Category 6" />
                            </div>
                            <div>
                                <h2>Brand Name:</h2>
                                <Checkbox label="Category 1" />
                                <Checkbox label="Category 2" />
                                <Checkbox label="Category 3" />
                                <Checkbox label="Category 4" />
                                <Checkbox label="Category 5" />
                                <Checkbox label="Category 6" />
                            </div>
                            <div>
                                <h2>Price Range:</h2>
                                <RangeSlider />
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </section>



            {/* Product Display */}
            <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
                {data?.products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {/* Paggination */}
            <div className="flex items-center justify-center my-5 gap-8">
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
                <Typography color="gray" className="font-normal">
                    Page <strong className="text-gray-900">{active}</strong> of{" "}
                    <strong className="text-gray-900">{data.totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === data?.totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
};

export default ProductSection;