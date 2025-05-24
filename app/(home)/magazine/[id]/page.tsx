import HeadingComponent from "@/app/shared/HeadingComponent"
import MagazineDetailedStyle from "./_styles/MagazineDetailed.module.css"
import ArticleInfoListComponent from "@/app/shared/ArticleInfoListComponent"

function page() {
    return (
        <main>
            <div className="container mx-auto p-5 bg-blue-400">
                <div className="grid grid-cols-12  p-5 gap-5 bg-red-400">
                    <section className="col-span-12 lg:col-span-6 bg-amber-500 min-h-[40vh]   p-3">
                        <div className="bg-green-400 flex flex-col justify-evenly h-full p-3">
                            <HeadingComponent
                                title="HOPE DIES LAST"
                                overrideInlineStyle={false}
                                headingStyle={MagazineDetailedStyle.headingComponent}
                                inlineStyle={{
                                    marginBlock: '1rem'
                                }}/>

                            <ArticleInfoListComponent
                                author="John Doe"
                                date="2021-01-01"
                                readTime="10 minutes"/>

                        </div>

                    </section>
                    <section className="col-span-12 lg:col-span-6 bg-amber-500  min-h-[40vh] p-3">
                        <div className="bg-green-400 flex flex-col justify-evenly h-full p-3">
                            <p className={` ${MagazineDetailedStyle.paragraph}`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem
                                ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum
                                dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                        </div>

                    </section>
                </div>

            </div>
        </main>
    )
}

export default page