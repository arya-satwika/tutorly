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

export default function CourseCard({title='booo', description='booooooo', tags=['fizz', 'buzz'], imageUrl=null, className}: CourseCardProps){
    if(imageUrl===null){
        return(
        <div className="bg-card-background rounded-xl px-4 py-1">
            <h1 className="font-bold text-4xl text-foreground-blue">{title}</h1>
            <p className='text-foreground-blue text-md'>{description}</p>
            <div className='flex flex-row gap-2'>
                {tags?.map((tag, i)=>(
                    <CourseTags key={i} courseTag={tag}/>
                ))}
            </div>
        </div>
        )
    }else{
        return(
            <div className="bg-card-background rounded-xl px-4 py-1">
                <h1 className="font-bold text-4xl text-foreground-blue">{title}</h1>
                <p className='text-foreground-blue text-md'>{description}</p>
                <div className='flex flex-row gap-2'>
                    {tags?.map((tag, i)=>(
                        <CourseTags key={i} courseTag={tag}/>
                    ))}
                </div>
                <div className='w-50'>
                <Image src={imageUrl} alt={title}/>
                </div>
    
            </div>
        )
    }
}