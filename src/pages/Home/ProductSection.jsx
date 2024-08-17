import React, { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import { IconButton, Button, Typography, Input, Collapse, Card, CardBody, Checkbox } from '@material-tailwind/react';
import { RiArrowUpDownFill } from 'react-icons/ri';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const fetchProducts = async ({ page = 1, limit = 12, search = '', sortBy = '', filters = {} }) => {
    const res = await fetch(`http://localhost:3000/products?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&category=${filters.category || ''}&brand=${filters.brand || ''}&minPrice=${filters.minPrice || 0}&maxPrice=${filters.maxPrice || 10000}`);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const fetchCategories = async () => {
    const res = await fetch('http://localhost:3000/categories');
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    return res.json();
};

const fetchBrands = async () => {
    const res = await fetch('http://localhost:3000/brands');
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
    const [filters, setFilters] = useState({ category: '', brand: '', minPrice: 0, maxPrice: 10000 });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    const toggleOpen = () => setOpen((cur) => !cur);

    const { data: productData, error: productError, isLoading: productLoading } = useQuery({
        queryKey: ['products', active, search, sortBy, filters],
        queryFn: () => fetchProducts({ page: active, limit: 12, search, sortBy, filters }),
        keepPreviousData: true,
    });

    const { data: categoryData, isLoading: categoryLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories
    });

    const { data: brandData, isLoading: brandLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: fetchBrands
    });

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

    const handleSortByPrice = () => {
        setSortBy(sortBy === 'priceAsc' ? 'priceDesc' : 'priceAsc');
    };

    const handleSortByDate = () => {
        setSortBy(sortBy === 'dateAsc' ? 'dateDesc' : 'dateAsc');
    };

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setSelectedCategories(prev =>
            checked ? [...prev, value] : prev.filter(category => category !== value)
        );
    };

    const handleBrandChange = (e) => {
        const { value, checked } = e.target;
        setSelectedBrands(prev =>
            checked ? [...prev, value] : prev.filter(brand => brand !== value)
        );
    };

    const handleFilterClick = () => {
        setFilters({
            ...filters,
            category: selectedCategories.join(','),
            brand: selectedBrands.join(','),
            minPrice: filters.minPrice,
            maxPrice: filters.maxPrice,
        });
        setActive(1);
    };

    const handlePriceChange = (value) => {
        setFilters(prev => ({
            ...prev,
            minPrice: value[0],
            maxPrice: value[1]
        }));
    };

    const next = () => {
        if (active < productData?.totalPages) {
            setActive(prev => prev + 1);
        }
    };

    const prev = () => {
        if (active > 1) {
            setActive(prev => Math.max(prev - 1, 1));
        }
    };

    if (productLoading || categoryLoading || brandLoading) return <div>Loading...</div>;
    if (productError) return <div>Error: {productError.message}</div>;

    return (
        <div id='productSection' className='w-11/12 mx-auto'>
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

                    {/* Sorting */}
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
                    <Button variant='outlined' className='bg-white text-outlet-secondary w-full' onClick={toggleOpen}>Product Filters</Button>
                </div>
                <Collapse open={open}>
                    <Card className="my-4 mx-auto w-11/12">
                        <CardBody>
                            <div>
                                <h2 className='font-inter text-outlet-secondary uppercase border border-outlet-primary w-fit px-3 rounded-t-md py-2 border-b-0'>Category:</h2>
                                <div className='grid border-outlet-primary rounded-md rounded-tl-none grid-cols-2 text-xs md:text-sm md:grid-cols-3 border'>
                                    {categoryData?.categories.map((category) => (
                                        <Checkbox
                                            key={category}
                                            label={category}
                                            value={category}
                                            onChange={handleCategoryChange}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h2 className='font-inter text-outlet-secondary uppercase border border-outlet-primary w-fit px-3 rounded-t-md py-2 border-b-0'>Brand Name:</h2>
                                <div className='grid border-outlet-primary rounded-md rounded-tl-none grid-cols-2 text-xs md:text-sm md:grid-cols-3 border'>
                                    {brandData?.brands.map((brand) => (
                                        <Checkbox
                                            key={brand}
                                            label={brand}
                                            value={brand}
                                            onChange={handleBrandChange}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className='mt-3'>
                                <h2 className='font-inter text-outlet-secondary uppercase border border-outlet-primary w-fit px-3 rounded-t-md py-2 border-b-0'>Price Range:</h2>
                                <div className='border-outlet-primary rounded-md rounded-tl-none border p-10 flex gap-2 items-center flex-col md:flex-row'>
                                    {/* <RangeSlider
                                        min={0}
                                        max={10000}
                                        step={10}
                                        value={[filters.minPrice, filters.maxPrice]}
                                        onChange={handlePriceChange}
                                        className="w-full"
                                    /> */}
                                    <Input
                                        type='number'
                                        label='Min Price'
                                        value={filters.minPrice}
                                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                                        className='w-full'
                                    />
                                    <p>—</p>
                                    <Input
                                        type='number'
                                        label='Max Price'
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                        className='w-full'
                                    />
                                </div>
                                <Button className='w-full mt-3 bg-outlet-accent text-outlet-text' onClick={handleFilterClick}>Filter</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </section>

            {/* Product Display */}
            <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
                {productData?.products.length > 0 ? (
                    productData.products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <Typography className='text-center col-span-full mt-5'>No products match the selected filters.</Typography>
                )}
            </div>

            {/* Pagination */}
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
                    <strong className="text-gray-900">{productData.totalPages}</strong>
                </Typography>
                <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={next}
                    disabled={active === productData?.totalPages}
                >
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </IconButton>
            </div>
        </div>
    );
};

export default ProductSection;
