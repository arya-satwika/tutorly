import Image from 'next/image';

type CourseCardProps = {
    title: string,
    description: string,
    tags: string[],
    imageUrl: string | null,
    className?: string
}


export function CourseTags({courseTag}: {courseTag: string}){
    return(
        <div className='bg-tag-background px-3 py-[0.3px] text-sm border-tag-border border rounded-full w-fit h-fit text-foreground-blue'>
            {courseTag}
        </div>
    )
}

let placeholderDesc = "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export default function CourseCard({title='title', description=placeholderDesc, tags=[], imageUrl, className}: CourseCardProps){
    imageUrl = 'https://4zj2fsf4qc.ucarecd.net/8f504100-3626-4622-807b-f6acbe3e0a4f/'
    const sizedUrl = `${imageUrl}-/scale_crop/300x300/center/`
    return(
        <div className="bg-card-background rounded-xl p-4 flex flex-row">
            {imageUrl && (
                <div className='w-fit mr-4'>
                <Image src={sizedUrl} alt={title} width={300} height={300}/>
                </div>
            )}
            <div>
                <h1 className="font-bold text-4xl text-foreground-blue">{title}</h1>
                <p className='text-foreground-blue text-md'>{description}</p>
                <div className='flex flex-row gap-2'>
                    {tags?.map((tag, i)=>(
                        <CourseTags key={i} courseTag={tag}/>
                    ))}
                </div>
            </div>
        </div>
    );
    // if(imageUrl===null){
        
    //     )
    // }else{
    //     return(
    //         <div className="bg-card-background rounded-xl px-4 py-4 flex flex-row">
                
    //             <div>
    //             <h1 className="font-bold text-4xl text-foreground-blue mb-5">{title}</h1>
    //             <p className='text-foreground-blue text-md mb-5'>{description}</p>
    //             <div className='flex flex-row gap-2'>
    //                 {tags?.map((tag, i)=>(
    //                     <CourseTags key={i} courseTag={tag}/>
    //                 ))}
    //             </div>
                

    //             </div>
    
    //         </div>
    //     )
    // }
}