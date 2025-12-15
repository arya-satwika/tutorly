import Image from 'next/image';

type CourseCardProps = {
    title: string,
    description: string,
    tags: string[],
    imageUrl: string | null,
    className?: string
}

const imageStyle = {
    fill: 'red'
}


export function CourseTags({courseTag}: {courseTag: string}){
    return(
        <div className='bg-tag-background px-3 py-[0.3px] text-sm border-tag-border border rounded-full w-fit h-fit text-foreground-blue'>
            {courseTag}
        </div>
    )
}

let placeholderDesc = "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."

export default function CourseCard({title='title', description=placeholderDesc, tags=[], imageUrl='image-placeholder.svg', className}: CourseCardProps){
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
            <div className="bg-card-background rounded-xl px-4 py-4 flex flex-row">
                <div className='w-90 fill-foreground-blue'>
                <Image src={imageUrl} style={imageStyle} alt={title} width={1000} height={1000}/>
                </div>
                <div>
                <h1 className="font-bold text-4xl text-foreground-blue mb-5">{title}</h1>
                <p className='text-foreground-blue text-md mb-5'>{description}</p>
                <div className='flex flex-row gap-2'>
                    {tags?.map((tag, i)=>(
                        <CourseTags key={i} courseTag={tag}/>
                    ))}
                </div>
                

                </div>
    
            </div>
        )
    }
}