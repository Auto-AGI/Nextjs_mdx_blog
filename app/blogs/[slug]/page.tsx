import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams(){

    const files =fs.readdirSync(path.join('blogs'))

    const paths = files.map(filename => ({
        slug: filename.replace('.mdx', '')
    }))

    return paths
}

function getPost({slug}: {slug: string}){

    const markdownFile = fs.readFileSync(path.join('blogs', slug + '.mdx'), 'utf-8')

    const{data: fontMatter, content} = matter(markdownFile)

    return {
        fontMatter,
        slug,
        content
    }

}


export default function Page({ params } :any){
    const props = getPost( params);

    return (
        <article className='prose prose-sm md:prose-base lg:prose-lg prose-slate !prose-invert mx-auto'>
            <h1>{props.fontMatter.title}</h1>

            <MDXRemote source={props.content} ></MDXRemote>
        </article>
    )
}