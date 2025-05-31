import Image from "next/image";
import magazine1 from '@/public/post/post1_v2.jpg'
import Link from "next/link";
import {GetPaginateArticles } from "../_actions/GetPaginatedArticles";
async function MagazineGrid() {
    const articles = await GetPaginateArticles(0,'asc')
    console.log("articles:  ",articles)
    return (
        <main className="container mx-auto my-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">

                <section className=" p-5 border-l border-r border-t border-b border-[#222222] ">
                    <span className="text-[#222222] text-sm font-medium  ">October 15, 2022</span>
                    <figure className=" p-3 ">
                        <Link href={'/magazine/1'}>
                            <Image
                                src={magazine1}
                                alt="magazine-1"
                                width={500}
                                height={500}
                                className=" object-cover object-center max-w-full "/>
                        </Link>
                        <figcaption className="p-3">
                            <Link href={'/magazine/1'}>
                                <h2 className="text-[#222222] text-4xl my-2 font-bold">Hope dies last</h2>
                            </Link>
                            <p className="text-[#222222] text-md">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos.</p>

                            <dl className="flex gap-x-5 mt-10">
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md font-medium ">Author</dt>
                                    <dd className="text-[#222222] text-md underline">Ahmed Ashraf</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md  font-medium">Read</dt>
                                    <dd className="text-[#222222] text-md ">10 Min</dd>
                                </div>
                            </dl>

                        </figcaption>
                    </figure>

                </section>
                <section className=" p-5   border-t border-b border-[#222222] ">
                <span className="text-[#222222] text-sm font-medium  ">October 15, 2022</span>
                <figure className=" p-3 ">
                        <Link href={'/magazine/1'}>
                            <Image
                                src={magazine1}
                                alt="magazine-1"
                                width={500}
                                height={500}
                                className=" object-cover object-center max-w-full "/>
                        </Link>
                        <figcaption className="p-3">
                            <Link href={'/magazine/1'}>
                                <h2 className="text-[#222222] text-4xl my-2 font-bold">Hope dies last</h2>
                            </Link>
                            <p className="text-[#222222] text-md">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos.</p>

                            <dl className="flex gap-x-5 mt-10">
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md font-medium ">Author</dt>
                                    <dd className="text-[#222222] text-md underline">Ahmed Ashraf</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md  font-medium">Read</dt>
                                    <dd className="text-[#222222] text-md ">10 Min</dd>
                                </div>
                            </dl>

                        </figcaption>
                    </figure>

                </section>

                <section className=" p-5 border-l border-r border-b border-t border-[#222222] ">
                <span className="text-[#222222] text-sm font-medium  ">October 15, 2022</span>
                <figure className=" p-3 ">
                        <Link href={'/magazine/1'}>
                            <Image
                                src={magazine1}
                                alt="magazine-1"
                                width={500}
                                height={500}
                                className=" object-cover object-center max-w-full "/>
                        </Link>
                        <figcaption className="p-3">
                            <Link href={'/magazine/1'}>
                                <h2 className="text-[#222222] text-4xl my-2 font-bold">Hope dies last</h2>
                            </Link>
                            <p className="text-[#222222] text-md">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos.</p>

                            <dl className="flex gap-x-5 mt-10">
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md font-medium ">Author</dt>
                                    <dd className="text-[#222222] text-md underline">Ahmed Ashraf</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md  font-medium">Read</dt>
                                    <dd className="text-[#222222] text-md ">10 Min</dd>
                                </div>
                            </dl>

                        </figcaption>
                    </figure>

                </section>

                <section className=" p-5 border-l border-r  border-b border-[#222222] ">
                <span className="text-[#222222] text-sm font-medium  ">October 15, 2022</span>
                <figure className=" p-3 ">
                        <Link href={'/magazine/1'}>
                            <Image
                                src={magazine1}
                                alt="magazine-1"
                                width={500}
                                height={500}
                                className=" object-cover object-center max-w-full "/>
                        </Link>
                        <figcaption className="p-3">
                            <Link href={'/magazine/1'}>
                                <h2 className="text-[#222222] text-4xl my-2 font-bold">Hope dies last</h2>
                            </Link>
                            <p className="text-[#222222] text-md">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos.</p>

                            <dl className="flex gap-x-5 mt-10">
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md font-medium ">Author</dt>
                                    <dd className="text-[#222222] text-md underline">Ahmed Ashraf</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md  font-medium">Read</dt>
                                    <dd className="text-[#222222] text-md ">10 Min</dd>
                                </div>
                            </dl>

                        </figcaption>
                    </figure>

                </section>
                <section className=" p-5   border-b border-[#222222] ">
                <span className="text-[#222222] text-sm font-medium  ">October 15, 2022</span>
                <figure className=" p-3 ">
                        <Link href={'/magazine/1'}>
                            <Image
                                src={magazine1}
                                alt="magazine-1"
                                width={500}
                                height={500}
                                className=" object-cover object-center max-w-full "/>
                        </Link>
                        <figcaption className="p-3">
                            <Link href={'/magazine/1'}>
                                <h2 className="text-[#222222] text-4xl my-2 font-bold">Hope dies last</h2>
                            </Link>
                            <p className="text-[#222222] text-md">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos.</p>

                            <dl className="flex gap-x-5 mt-10">
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md font-medium ">Author</dt>
                                    <dd className="text-[#222222] text-md underline">Ahmed Ashraf</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md  font-medium">Read</dt>
                                    <dd className="text-[#222222] text-md ">10 Min</dd>
                                </div>
                            </dl>

                        </figcaption>
                    </figure>
                </section>

                <section className=" p-5 border-l border-r border-b  border-[#222222] ">
                <span className="text-[#222222] text-sm font-medium  ">October 15, 2022</span>
                <figure className=" p-3 ">
                        <Link href={'/magazine/1'}>
                            <Image
                                src={magazine1}
                                alt="magazine-1"
                                width={500}
                                height={500}
                                className=" object-cover object-center max-w-full "/>
                        </Link>
                        <figcaption className="p-3">
                            <Link href={'/magazine/1'}>
                                <h2 className="text-[#222222] text-4xl my-2 font-bold">Hope dies last</h2>
                            </Link>
                            <p className="text-[#222222] text-md">Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Quisquam, quos.</p>

                            <dl className="flex gap-x-5 mt-10">
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md font-medium ">Author</dt>
                                    <dd className="text-[#222222] text-md underline">Ahmed Ashraf</dd>
                                </div>
                                <div className="flex gap-2">
                                    <dt className="text-[#222222] text-md  font-medium">Read</dt>
                                    <dd className="text-[#222222] text-md ">10 Min</dd>
                                </div>
                            </dl>

                        </figcaption>
                    </figure>

                </section>

            </div>
        </main>
    )
}

export default MagazineGrid