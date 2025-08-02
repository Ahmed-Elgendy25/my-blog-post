import HeadingComponent from '@/app/shared/HeadingComponent'
import MagazineDetailedStyle from '../_styles/MagazineDetailed.module.css'
import ArticleInfoListComponent from '@/app/shared/ArticleInfoListComponent'
function HeadingDetails({title, durationRead, author, date,subTitle}: {title: string, durationRead: string, author: string, date: string,subTitle:string}) {
    return <>
    <section className="col-span-12 lg:col-span-6  min-h-[40vh]   p-3">
        <div className="flex flex-col justify-evenly h-full p-3">
            <HeadingComponent
                title={title}
                overrideInlineStyle={false}
                headingStyle={MagazineDetailedStyle.headingComponent}
                inlineStyle={{
                    marginBlock: '1rem'
                }}/>

            <ArticleInfoListComponent
                author={author}
                date={date}
                readTime={durationRead}/>

        </div>

    </section> 
    <section className = "col-span-12 lg:col-span-6   min-h-[40vh] p-3" > <div className=" flex flex-col justify-evenly h-full p-3">
        <p className={` ${MagazineDetailedStyle.paragraph}`}>{subTitle}</p>
    </div>

</section>

</>

}

export default HeadingDetails