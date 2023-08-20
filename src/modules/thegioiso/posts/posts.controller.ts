import { Helper } from './../../../common/utils/helper';
import { PostImagesService } from './../post_images/post_images.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import puppeteer from 'puppeteer';
import { Product } from 'src/modules/system/products/entities/product.entity';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Public } from 'src/common/decorators/public.decorator';
import { CategoriesService } from '../categories/categories.service';
import { ImagesService } from '../images/images.service';
import ChatGPTClient from 'src/common/chatGPT/ChatGPTClient';
import settingChatGPT from 'src/common/utils/settingChatGPT';
import axios from 'axios';
import { Images } from '../images/entities/image.entity';
import { Posts } from './entities/post.entity';
import { TagsService } from '../tags/tags.service';
import { Tags } from '../tags/entities/tag.entity';
import { Post_Images } from '../post_images/entities/post_image.entity';

@Controller('thegioiso/posts')
@Public()
export class PostsController {
  constructor(
    private readonly CategoriesService: CategoriesService,
    private readonly ImagesService: ImagesService,
    private readonly PostImagesService: PostImagesService,
    private readonly PostsService: PostsService,
    private readonly TagsService: TagsService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  @Get('cate-xahoi')
  async findAll(@Req() req) {
    await this.cate_xahoi(req.query.pathUrl);
    await this.getQueueXaHoi(req.query.cateId);
    // return 'sdfds';
    // try {
    //   let conversationData = {};
    //   const client = new ChatGPTClient(
    //     settingChatGPT.openaiApiKey,
    //     settingChatGPT.chatGptClient,
    //     settingChatGPT.cacheOptions,
    //   );
    //   let reply;
    //   const response = await client.sendMessage('Chào bạn', {
    //     ...conversationData,
    //     onProgress: (token) => {
    //       reply += token;
    //     },
    //   });
    //   const responseText = response.response;
    //   console.log(responseText);
    //   conversationData = {
    //     conversationId: response.conversationId,
    //     parentMessageId: response.messageId,
    //   };
    // } catch (error) {
    //   console.log(error);
    // }
  }
  async cate_xahoi(pathUrl) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const array_item = [];
    await page.goto(pathUrl, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    const dataObj = {};

    dataObj['title'] = await page.$eval('div.firstitem > a', (item) =>
      item.getAttribute('title'),
    );
    dataObj['link'] = await page.$eval(
      'div.firstitem > a',
      (item) => item.href,
    );
    dataObj['image_src'] = await page.$eval(
      'div.firstitem > a > img',
      (item) => item.src,
    );
    dataObj['content'] = await page.$eval(
      'div.firstitem > div.hl-info > p.sapo.box-category-sapo',
      (item) => item.innerHTML,
    );
    array_item.push(dataObj);

    const list_xh_1: any = await page.$$eval(
      'div.cate-hl-row2 > div.big',
      (links) => {
        // Make sure the book to be scraped is in stock
        // Extract the links from the data
        return links.map((el) => ({
          title: el.querySelector<HTMLImageElement>('a img')?.title || '',
          link: el.querySelector<HTMLLinkElement>('a')?.href || '',
          image_src: el.querySelector<HTMLImageElement>('a img')?.src || '',
          content: el.querySelector<HTMLElement>('p.sapo').innerHTML || '',
        }));
      },
    );

    const list_xh_2: any = await page.$$eval(
      'div.listchungkhoannew > .box-category-item',
      (links) => {
        // Make sure the book to be scraped is in stock
        // Extract the links from the data
        return links.map((el) => ({
          title:
            el.querySelector<HTMLImageElement>('div.tlitem-flex a img')
              ?.title || '',
          link:
            el.querySelector<HTMLLinkElement>('div.tlitem-flex a')?.href || '',
          image_src:
            el.querySelector<HTMLImageElement>('div.tlitem-flex a img')?.src ||
            '',
          content:
            el.querySelector<HTMLElement>(
              'div.knswli-right p.box-category-sapo',
            ).innerHTML || '',
        }));
      },
    );
    array_item.push(...list_xh_1);
    array_item.push(...list_xh_2);

    if (array_item.length > 0) {
      for (const item of array_item) {
        this.redis.rpush('list_xahoi', JSON.stringify(item));
      }
    }
    await page.close();
    await browser.close();
  }
  private async getQueueXaHoi(cateId) {
    let xahoi_detail = null;
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    do {
      xahoi_detail = await this.redis.lpop('list_xahoi');
      if (xahoi_detail) {
        xahoi_detail = JSON.parse(xahoi_detail);
        console.log(xahoi_detail);
        const _post = await this.PostsService.findByLink(xahoi_detail.link);
        console.log('_post_post_post_post', _post);
        if (_post) {
          console.log('bài viết đã tồn tại trong cơ sở dữ liệu');
          continue;
        }
        const page = await browser.newPage();
        try {
          const dataObj: any = {};
          // Navigate to the selected page

          await page.goto(xahoi_detail.link, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
          });
          dataObj['keywords'] = await page.$eval(
            'head > meta[name="keywords"]',
            (item) => item.content,
          );
          await page.waitForSelector('div.detail-content');
          const list_xh_1: any = await page.$$eval(
            'div.detail-content > *',
            (links) => {
              // Make sure the book to be scraped is in stock
              // Extract the links from the data
              return links.map((el) => ({
                title:
                  el.querySelector<HTMLLinkElement>(
                    '.VCSortableInPreviewMode a',
                  )?.title || '',
                image_src:
                  el.querySelector<HTMLImageElement>(
                    '.VCSortableInPreviewMode a img',
                  )?.src || '',
                content:
                  el.tagName == 'P' ||
                  el
                    .querySelector<HTMLImageElement>('div')
                    ?.getAttribute('placeholder') == '[nhập nội dung]'
                    ? el.outerHTML
                    : '',
                content_p:
                  el.tagName == 'P' ||
                  el
                    .querySelector<HTMLImageElement>('div')
                    ?.getAttribute('placeholder') == '[nhập nội dung]'
                    ? el.innerHTML
                    : '',
              }));
            },
          );
          const post: any = {};
          let image_post = null;
          const image_post_slider = [];
          if (list_xh_1.length > 0) {
            let image_thumnail = false;
            let content_detail = '';

            for (let index = 0; index < list_xh_1.length; index++) {
              const element = list_xh_1[index];
              if (
                image_thumnail == false &&
                !Helper._isString(element.image_src)
              ) {
                image_thumnail = true;
                console.log('element.image_src', element);
                const rs_link = await this.ImagesService.findByLink(
                  element.image_src,
                );
                console.log('element.rs_link', rs_link);
                if (!rs_link) {
                  const result: any = await axios.get(
                    `${process.env.UPLOAD_CDN}v2/common/upload/path?fileUrl=${element.image_src}`,
                  );
                  console.log('result', result.data.data);

                  if ((result.code = 200)) {
                    const Image = new Images();
                    Image.fileName = result.data.data.filename;
                    Image.link_external = element.image_src;
                    Image.imageBig = result.data.data.image_big;
                    Image.imageMid = result.data.data.image_mid;
                    Image.imageSmall = result.data.data.image_small;
                    Image.imageSlider = result.data.data.image_slider;
                    Image.imageMime = result.data.data.ext;
                    Image.userId = 1;
                    const rs_ing = await this.ImagesService.addOrUpdate(Image);
                    list_xh_1[index]['image_src'] = rs_ing;
                    image_post = rs_ing;
                    image_post_slider.push(rs_ing);
                    console.log('___________rs_ing', rs_ing);
                  }
                } else {
                  list_xh_1[index]['image_src'] = rs_link;
                  image_post = rs_link ? rs_link : null;
                  if (rs_link) {
                    image_post_slider.push(rs_link);
                  }
                  console.log('ảnh đã tồn tại 1', rs_link);
                }
              } else {
                const rs_link = await this.ImagesService.findByLink(
                  element.image_src,
                );
                if (!rs_link && element.image_src) {
                  const result: any = await axios.get(
                    `${process.env.UPLOAD_CDN}v2/common/upload/path?fileUrl=${element.image_src}`,
                  );
                  if ((result.code = 200)) {
                    const Image = new Images();
                    Image.fileName = result.data.data.filename;
                    Image.link_external = element.image_src;
                    Image.imageBig = result.data.data.image_big;
                    Image.imageMid = result.data.data.image_mid;
                    Image.imageSmall = result.data.data.image_small;
                    Image.imageSlider = result.data.data.image_slider;
                    Image.imageMime = result.data.data.ext;
                    Image.userId = 1;
                    const rs_ing = await this.ImagesService.addOrUpdate(Image);
                    list_xh_1[index]['image_src'] = rs_ing;
                    image_post_slider.push(rs_ing);
                  }
                } else {
                  list_xh_1[index]['image_src'] = rs_link;
                  if (rs_link) {
                    image_post_slider.push(rs_link);
                  }
                }
              }

              // thêm bài viết ở đây
              if (list_xh_1[index]['image_src'] && element.image_src) {
                const _image = list_xh_1[index]['image_src'];
                const tag_image =
                  '<div class="VCSortableInPreviewMode" type="Photo">' +
                  '<div><a href="/' +
                  _image.imageBig +
                  '" data-fancybox="img-lightbox" title="' +
                  element.title +
                  '" target="_blank" class="detail-img-lightbox" rel="noopener">' +
                  '<img src="/' +
                  _image.imageBig +
                  '" id="img_616924805866328064" w="540" h="346" alt="' +
                  xahoi_detail.title +
                  '" title="' +
                  xahoi_detail.title +
                  '" rel="lightbox" photoid="616924805866328064" type="photo" data-original="/' +
                  _image.imageBig +
                  '" width="" height="" class="lightbox-content">' +
                  '</a></div>' +
                  '<div class="PhotoCMS_Caption PhotoCMS_Author">' +
                  '<p data-placeholder="Nhập chú thích ảnh">' +
                  element.title +
                  '</p>' +
                  '</div>' +
                  '</div>';
                content_detail += tag_image;
              }
              if (list_xh_1[index]['content']) {
                content_detail += element.content;
              }
            }
            post['content_detail'] = content_detail;
          }
          const posts = new Posts();
          posts.langId = 1;
          posts.title = xahoi_detail.title;
          posts.titleSlug = Helper.convertToSlug(
            Helper.toLowerCaseNonAccentVietnamese(xahoi_detail.title),
          );
          // posts.titleHash = ;
          posts.summary = xahoi_detail.content;
          posts.content = post.content_detail;
          posts.keywords = dataObj.keywords;
          posts.userId = 1;
          posts.categoryId = parseInt(cateId);
          posts.imageBig = image_post ? image_post.imageBig : null;
          posts.imageMid = image_post ? image_post.imageMid : null;
          posts.imageSmall = image_post ? image_post.imageSmall : null;
          posts.imageSlider = image_post ? image_post.imageSlider : null;
          image_post ? (posts.imageMime = image_post.imageMime) : '';
          posts.is_slider = 1;
          posts.is_picked = 1;
          posts.hit = 1;
          posts.slider_order = 0;
          posts.optional_url = xahoi_detail.link;
          posts.post_type = 'post';
          // posts.video_url = ;
          // posts.video_embed_code = ;
          // posts.image_url = ;
          posts.need_auth = 0;
          posts.feed_id = 0;
          posts.show_post_url = 1;
          posts.visibility = 1;
          posts.status = 1;
          posts.link_external = xahoi_detail.link;
          const _posts = await this.PostsService.addOrUpdate(posts);
          const tags = posts.keywords.split(',');
          if (posts && tags.length > 0) {
            for (const item of tags) {
              if (item) {
                const tag = new Tags();
                tag.postId = _posts.id;
                tag.tag = item;
                tag.tagSlug = item;
                await this.TagsService.addOrUpdate(tag);
              }
            }
          }
          if (image_post_slider.length > 0) {
            for (const item of image_post_slider) {
              if (item) {
                const _post_image = new Post_Images();
                _post_image.postId = _posts.id;
                _post_image.imagePath = item.imageSlider;
                await this.PostImagesService.addOrUpdate(_post_image);
              }
            }
          }
          await page.close();
        } catch (exce: any) {
          await page.close();
          console.log(exce.stack);
        }
      }
    } while (xahoi_detail);
    await browser.close();
  }
}
