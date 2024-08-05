"use client";
import { Button } from '@/components/ui/button'
import axios from 'axios';
import React, { useState } from 'react'
import { Textarea } from './ui/textarea';
import { Pencil } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Banner {
  category: string;
  description: string;
  elements: any; 
  height: number;
  id: string;
  minVersionCode: number;
  size: 'square' | 'portrait' | 'landscape';
  tags: []; 
  width: number;
}
interface ChildImage {
  alt_description: string,
  author_name: string,
  author_profile_url: string,
  download_location: string,  
  id: string,
  likes:number,
  thumbnail_url: string,
  unsplash_url: string,
  url:string
}

const url = "https://zxlfebn5bmjewfy2dp5cihqs7m0azmlb.lambda-url.ap-south-1.on.aws/";
const config = {
  headers: {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,bn;q=0.6,ar;q=0.5',
    'Connection': 'keep-alive',
    'Content-Length': '50',
    'Content-Type': 'text/plain;charset=UTF-8',
    'Host': 'zxlfebn5bmjewfy2dp5cihqs7m0azmlb.lambda-url.ap-south-1.on.aws',
    'Origin': 'https://www.bannerbot.xyz',
    'Referer': 'https://www.bannerbot.xyz/',
    'Sec-Ch-Ua': '"Not)A;Brand";v="99", "Brave";v="127", "Chromium";v="127"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Gpc': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
  }
};

const Home = () => {
  const [inputdata, setInputData] = useState<string>('make a banner');
  const [loader, setLoader] = useState<boolean>(false);
  const [imageData, setImageData] = useState<Banner[]>([]);
  const [childImage, setChildData] = useState<ChildImage[]>([]);
  const indicesToShow = [1, 5, 9, 12,13, 15, 18];
  const indicesToShowOnlyImage = [0, 2, 3,4,6,7,8,10,11,14,16,17];
  const getData = async () => {
    setLoader(true);
    await axios.post(url, `{"query":"${inputdata}"}`, config)
      .then(response => {
        setImageData(response.data.banners);
        setChildData(response.data.images);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoader(false)
      })
  }
  
  const squareBanners = imageData.filter(banner => banner.size === "square");
  const exceptBanner = squareBanners.filter((_, index) => indicesToShowOnlyImage.includes(index));
  const filteredBanners = squareBanners.filter((_, index) => indicesToShow.includes(index));

  console.log(childImage);
  return (
    <div className='py-10 flex flex-col items-center gap-5 px-10'>
      <h1 className='text-4xl md:text-5xl opacity-80 font-bold tracking-tighter text-center'>Welcome to <span className='bg-primary-color px-2 text-white'>Banner</span> Maker</h1>
      <p className='opacity-60'>Enter prompt yo generate the banner</p>
      <Textarea value={inputdata} onChange={(e) => setInputData(e.target.value)} className='max-w-96' required placeholder='Enter the query' />
      <Button disabled={loader} onClick={getData}>Generate the banner {loader && (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={20} height={20} style={{ shapeRendering: 'auto', display: 'block', background: '#F97316' }} xmlnsXlink="http://www.w3.org/1999/xlink"><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke="#ffffff" fill="none" cy="50" cx="50">
          <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="0.5208333333333333s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </circle><g></g></g></svg>
  )}</Button>
<div className="w-full grid md:grid-cols-4 gap-2 md:px-20">
{filteredBanners.map((i, index) => (
  <>
      <div
        key={index}
        className="bg-primary relative"
      >
          <img
            style={{
              borderRadius: i.elements[0].imageProps.borderRadius,
              borderWidth: i.elements[0].imageProps.borderWidth,
            }}
            src={i.elements[0].imageProps.url}
            alt={i.elements[0].imageProps.variableName}
          />
              <Dialog >
              <DialogTrigger asChild>
          <Button className='absolute top-5 right-5'>
          <Pencil className=' text-primary text-white '/>
          </Button>
          </DialogTrigger>
      <DialogContent className="md:max-h-[40dvw] max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Banner</DialogTitle>
          <DialogDescription>
            Make changes to your Banner here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <img
            style={{
              borderRadius: i.elements[0].imageProps.borderRadius,
              borderWidth: i.elements[0].imageProps.borderWidth,
            }}
            src={i.elements[0].imageProps.url}
            alt={i.elements[0].imageProps.variableName}
          />
          <p>Images</p>
            <div className="flex gap-2 overflow-x-auto">
              {childImage.map(({url},index)=>(
                <>
                <img key={index} src={url} alt="" className='size-20 rounded-full object-cover' />
                </>
              ))}
            </div>
            <div>
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Description
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Button Text
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className='flex items-center justify-between'>
          <a href={i.elements[0].imageProps.url} download={`image${index}.png`}>
          <Button type="submit">Download</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>
      </div>
      </>
    ))}
    </div>

    </div>
  )
}

export default Home
