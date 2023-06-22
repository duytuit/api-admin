import { ChapterDetail } from './../chapter_detail/entities/chapter_detail.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DevService } from './dev.service';
import { CreateDevDto } from './dto/create-dev.dto';
import { UpdateDevDto } from './dto/update-dev.dto';
import { Public } from 'src/common/decorators/public.decorator';
import puppeteer from 'puppeteer';
import { stkissmanga } from 'src/common/class/crawler_link';

import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as path from 'path';
import { ProductsService } from '../products/products.service';
import { CategoriesService } from '../categories/categories.service';
import { GenresService } from '../genres/genres.service';
import { ProductDetailsService } from '../product_details/product_details.service';
import { ProjectsService } from '../projects/projects.service';
import { UploadService } from '../upload/upload.service';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { ProductDetail } from '../product_details/entities/product_detail.entity';
import { Genre } from '../genres/entities/genre.entity';
import { Upload } from '../upload/entities/upload.entity';
import { AjaxResult } from 'src/common/class/ajax-result.class';
import { DataObj } from 'src/common/class/data-obj.class';
import { debuglog } from 'util';
import { LogDebug } from 'src/common/debugLog';
import { ChapterDetailService } from '../chapter_detail/chapter_detail.service';

@Controller('system/dev')
@Public()
export class DevController {
  constructor(
    private readonly devService: DevService,
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly genresService: GenresService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly projectsService: ProjectsService,
    private readonly uploadService: UploadService,
    private readonly chapterDetailService: ChapterDetailService,
  ) {}

  @Post()
  create(@Body() createDevDto: CreateDevDto) {
    return this.devService.create(createDevDto);
  }

  @Get('list')
  async findAll() {
    // const rs_pro_detail = await this.productDetailsService.findByName(
    //   'https://1stkissmanga.me/manga/schools-over-please-stay/',
    // );
    // console.log(rs_pro_detail);
    // await this.listManga();
    // console.log('================= hoàn thành list manga ===================');
    // await this.detailManga();
    // console.log(
    //   '================= hoàn thành detail manga ===================',
    // );
    await this.chapterManga();
    // const rs_url = await this.uploadService.add(
    //   [],
    //   'https://1stkissmanga.me/wp-content/uploads/thumb_5d759400c4427-10220-110x150.jpg',
    // );
    // console.log(rs_url);
    // const dataObj = {};
    // const browser = await puppeteer.launch({
    //   headless: true,
    //   args: ['--no-sandbox'],
    // });
    // const page = await browser.newPage();
    // await page.goto(
    //   'https://1stkissmanga.me/manga/doupo-cangqiong/chapter-398/',
    // );
    // dataObj['title_detail'] = await page.$eval(
    //   '#chapter-heading',
    //   (item) => item.innerHTML,
    // );
    // const Imgs = await page.$$eval(
    //   '.reading-content > .page-break',
    //   (links) => {
    //     // Make sure the book to be scraped is in stock
    //     // Extract the links from the data
    //     const item_img = links.map((el) => ({
    //       id_image: el.querySelector('img').id,
    //       src: el.querySelector('img').src,
    //     }));
    //     return item_img;
    //   },
    // );
    // dataObj['imgs'] = Imgs;
    // console.log(dataObj);
    // const all_rs_url = [];
    // if (Imgs) {
    //   for (let index_2 = 0; index_2 < Imgs.length; index_2++) {
    //     try {
    //       const element_1 = Imgs[index_2];
    //       const filename = element_1.src.substring(
    //         element_1.src.lastIndexOf('/') + 1,
    //       );
    //       const re_uoload = await this.uploadService.findByName(filename);
    //       console.log(re_uoload);
    //       if (!re_uoload) {
    //         // await page.addStyleTag({
    //         //   content: '{scroll-behavior: auto !important;}',
    //         // });
    //         await page.waitForSelector('#' + element_1.id_image);
    //         const Image_by_id = await page.$('#' + element_1.id_image);
    //         console.log(Image_by_id);
    //         const image_buffer = await Image_by_id.screenshot();
    //         // await page.waitForNavigation();
    //         const rs_upload = await this.uploadService.addByBuffer(
    //           image_buffer,
    //           filename,
    //         );
    //         if (rs_upload.uploadId) {
    //           console.log('kết quả trả về', rs_upload.uploadId);
    //           all_rs_url.push(rs_upload.externalLink);
    //         } else {
    //           console.log('upload file thất bại');
    //         }
    //       } else {
    //         all_rs_url.push(re_uoload.externalLink);
    //       }
    //     } catch (exce: any) {
    //       console.log(exce.stack);
    //       continue;
    //     }
    //   }
    // }
    // console.log(all_rs_url);
    // await page.close();
    // await browser.close();
  }
  private async cateManga() {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('https://1stkissmanga.me/manga/?genres_collapse=on', {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    }); // check networkidle0 parameter and others here: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagegotourl-options
    const manga: any = await page.$$eval('.list-unstyled > li', (links) => {
      // Make sure the book to be scraped is in stock
      // Extract the links from the data
      return links.map((el) => ({
        title: el
          .querySelector('a')
          .innerText.replace(/<[^>]*>?/gm, '')
          .replace(/[0-9]/g, '')
          .replace(/[(|)]/gm, '')
          .trim(),
        link: el.querySelector<HTMLLinkElement>('a').href,
      }));
    });
    if (manga.length > 0) {
      manga.forEach(async (element) => {
        const rs_cat = await this.categoriesService.findByName(element.title);
        if (rs_cat.length == 0) {
          const cat = new Category();
          cat.name = element.title;
          cat.linkExternal = element.link;
          cat.projectId = 1;
          cat.type = 1;
          const sdfdsf = await this.categoriesService.addOrUpdate(cat);
          console.log(sdfdsf);
        }
      });
    }
    await page.close();
    await browser.close();
  }
  private async listManga() {
    const limit = [1, 2, 3, 4, 5];
    const new_stkissmanga = [];
    await Promise.all(
      stkissmanga.map(async (element) => {
        return limit.map((element_1) => {
          new_stkissmanga.push(element + 'page/' + element_1);
        });
      }),
    );
    console.log(new_stkissmanga);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const dataObj = [];
    for (const nameUrl of new_stkissmanga) {
      const fullUrl = `${nameUrl}`;
      console.log(`begin for ${fullUrl}`);
      await page.goto(fullUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      }); // check networkidle0 parameter and others here: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagegotourl-options
      const manga = await page.$$('.page-content-listing > .page-listing-item');
      for (let i = 0; i < manga.length; i++) {
        const values = await manga[i].$$eval('.page-item-detail', (links) => {
          return links.map((el) => ({
            title: el.querySelector('h3 > a').innerHTML,
            link: el.querySelector<HTMLLinkElement>('h3 > a').href,
            thumbnail_1: el.querySelector<HTMLImageElement>(
              '.item-thumb > a > img',
            ).src,
            rated: el.querySelector('.allow_vote > .total_votes').innerHTML,
          }));
        });
        // values.forEach((item) => {
        //   item['link_cat'] = fullUrl;
        // });
        dataObj.push(...values);
      }
    }
    console.log(dataObj);

    for (const item in dataObj) {
      const filename = dataObj[item].thumbnail_1.substring(
        dataObj[item].thumbnail_1.lastIndexOf('/') + 1,
      );
      // console.log(dataObj[item].thumbnail_1);
      // console.log(filename);
      const re_uoload = await this.uploadService.findByName(filename);
      if (!re_uoload) {
        const rs_url: any = await this.uploadService.add(
          [],
          dataObj[item].thumbnail_1,
        );
        if (rs_url) {
          console.log(rs_url);
          const search_product = await this.productsService.findByLink(
            dataObj[item].link,
          );
          if (search_product.length == 0) {
            // const search_cate = await this.categoriesService.findByLink(
            //   dataObj[item].link_cat,
            // );
            const product = new Product();
            product.name = dataObj[item].title;
            product.projectId = 1;
            product.rated = dataObj[item].rated;
            product.linkExternal = dataObj[item].link;
            product.imageThumnail = rs_url[0].externalLink;
            //  product.categoryId = search_cate ? search_cate.id : null;
            const rs_product = await this.productsService.addOrUpdate(product);
            console.log(rs_product);
          } else {
            console.log('sản phẩm bị trùng lặp');
          }
        }
      } else {
        const search_product = await this.productsService.findByLink(
          dataObj[item].link,
        );
        if (search_product.length == 0) {
          // const search_cate = await this.categoriesService.findByLink(
          //   dataObj[item].link_cat,
          // );
          const product = new Product();
          product.name = dataObj[item].title;
          product.projectId = 1;
          product.rated = dataObj[item].rated;
          product.linkExternal = dataObj[item].link;
          product.imageThumnail = re_uoload.externalLink;
          //  product.categoryId = search_cate ? search_cate.id : null;
          const rs_product = await this.productsService.addOrUpdate(product);
          console.log(rs_product);
        } else {
          console.log('sản phẩm bị trùng lặp');
        }
      }
    }

    await page.close();
    await browser.close();
  }

  private async detailManga() {
    const list = await this.productsService.findAll();
    if (list.length > 0) {
      const dataObj = {};
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
      });
      const page = await browser.newPage();
      for (const index of list) {
        const fullUrl = `${index.linkExternal}`;
        console.log(`begin for ${fullUrl}`);
        await page.goto(fullUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        }); // check networkidle0 parameter and others here: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagegotourl-options
        try {
          dataObj['title'] = await page.$eval(
            'div.post-title',
            (item) => item.innerText,
          );
          dataObj['thumbnail_2'] = await page.$eval(
            '.summary_image img',
            (item) => item.src,
          );
          dataObj['content'] = await page.$eval(
            'div.summary__content',
            (item) => item.innerText,
          );
          dataObj['release'] = await page.$eval(
            '.post-status .summary-content a',
            (item) => item.innerText,
          );
          dataObj['alternative'] = await page.$eval(
            'div:nth-of-type(5) div.summary-content',
            (item) => item.innerText,
          );
          const Genres = await page.$$eval(
            'div.genres-content > a',
            (links) => {
              // Make sure the book to be scraped is in stock
              // Extract the links from the data
              return links.map((el) => ({
                text: el.innerText,
                url: el.href,
              }));
            },
          );
          const chapter = await page.$$eval('.wp-manga-chapter', (links) => {
            // Make sure the book to be scraped is in stock
            // Extract the links from the data
            return links.map((el) => ({
              text: el.querySelector('a').innerText,
              url: el.querySelector('a').href,
              post_on: el.querySelector('.chapter-release-date > i')?.innerHTML,
            }));
          });
          dataObj['genres'] = Genres;
          dataObj['chapter'] = chapter;
          console.log(dataObj);
          const new_Genres = [];
          Genres.forEach(async (item) => {
            console.log(item.url);
            const rs_genres = await this.genresService.findByLink(item.url);
            console.log('rs_genres', rs_genres);
            if (!rs_genres) {
              const genre = new Genre();
              genre.linkExternal = item.url;
              genre.name = item.text;
              genre.projectId = 1;
              const gen_save = await this.genresService.addOrUpdate(genre);
              new_Genres.push(gen_save.id);
            }
          });
          if (dataObj) {
            const rs_pro_detail = await this.productDetailsService.findByName(
              dataObj['title'],
            );
            let rs_url = [];
            const re_uoload = await this.uploadService.findByName(
              dataObj['thumbnail_2'],
            );
            if (!re_uoload) {
              rs_url = await this.uploadService.add([], dataObj['thumbnail_2']);
              if (rs_pro_detail && rs_pro_detail?.name) {
                console.log('có sửa ở đây');
                console.log(rs_pro_detail);
                rs_pro_detail.chapters = JSON.stringify(chapter);
                const dsf = await this.productDetailsService.addOrUpdate(
                  rs_pro_detail,
                );
              } else {
                console.log('có thêm ở đây');
                console.log(dataObj['title']);
                const product_detail = new ProductDetail();
                product_detail.name = dataObj['title'];
                product_detail.shortDescription = dataObj['alternative'];
                product_detail.description = dataObj['content'];
                product_detail.release = dataObj['release'];
                product_detail.chapters = JSON.stringify(chapter);
                product_detail.productId = index.id;
                product_detail.projectId = 1;
                product_detail.imageThumnail = rs_url
                  ? rs_url[0].externalLink
                  : null;
                new_Genres.length > 0
                  ? (product_detail.genresId = JSON.stringify(new_Genres))
                  : null;
                const dsf = await this.productDetailsService.addOrUpdate(
                  product_detail,
                );
              }
            } else {
              if (rs_pro_detail && rs_pro_detail?.name) {
                console.log('có sửa ở đây');
                console.log(rs_pro_detail);
                rs_pro_detail.chapters = JSON.stringify(chapter);
                const dsf = await this.productDetailsService.addOrUpdate(
                  rs_pro_detail,
                );
              } else {
                console.log('có thêm ở đây');
                console.log(dataObj['title']);
                const product_detail = new ProductDetail();
                product_detail.name = dataObj['title'];
                product_detail.shortDescription = dataObj['alternative'];
                product_detail.description = dataObj['content'];
                product_detail.release = dataObj['release'];
                product_detail.chapters = JSON.stringify(chapter);
                product_detail.productId = index.id;
                product_detail.projectId = 1;
                product_detail.imageThumnail = re_uoload.externalLink;
                new_Genres.length > 0
                  ? (product_detail.genresId = JSON.stringify(new_Genres))
                  : null;
                const dsf = await this.productDetailsService.addOrUpdate(
                  product_detail,
                );
              }
            }
          }
        } catch (exception: any) {
          console.log(exception.stack);
          continue;
        }
      }
      await page.close();
      await browser.close();
    } else {
      console.log('không tìm thấy sản phẩm nào');
    }
  }
  private async chapterManga() {
    const list = await this.productDetailsService.findAll();
    // console.log(list);
    // return;

    if (list.length > 0) {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox'],
      });

      // await page.setUserAgent('UA-TEST');
      for (const index of list) {
        if (index.chapters) {
          const list_chapters = JSON.parse(index.chapters);
          const dataObj = {};
          for (let index_1 = 0; index_1 < list_chapters.length; index_1++) {
            try {
              const element = list_chapters[index_1];
              // Navigate to the selected page
              const page = await browser.newPage();
              await page.goto(element.url, {
                waitUntil: 'domcontentloaded',
                timeout: 30000,
              });
              dataObj['title_detail'] = await page.$eval(
                '#chapter-heading',
                (item) => item.innerHTML,
              );
              const Imgs = await page.$$eval(
                '.reading-content > .page-break',
                (links) => {
                  // Make sure the book to be scraped is in stock
                  // Extract the links from the data
                  const item_img = links.map((el) => ({
                    id_image: el.querySelector('img').id,
                    src: el.querySelector('img').src,
                  }));
                  return item_img;
                },
              );
              dataObj['imgs'] = Imgs;
              console.log(dataObj);
              const all_rs_url = [];

              if (Imgs) {
                for (let index_2 = 0; index_2 < Imgs.length; index_2++) {
                  try {
                    const element_1 = Imgs[index_2];
                    const filename = element_1.src.substring(
                      element_1.src.lastIndexOf('/') + 1,
                    );
                    const re_uoload = await this.uploadService.findByName(
                      filename,
                    );
                    console.log(element.url);
                    console.log(re_uoload);
                    if (!re_uoload) {
                      // await page.addStyleTag({
                      //   content: '{scroll-behavior: auto !important;}',
                      // });
                      await page.waitForSelector('#' + element_1.id_image);
                      const Image_by_id = await page.$(
                        '#' + element_1.id_image,
                      );
                      console.log(Image_by_id);

                      const image_buffer = await Image_by_id.screenshot();
                      // await page.waitForNavigation();
                      const rs_upload = await this.uploadService.addByBuffer(
                        image_buffer,
                        filename,
                      );
                      if (rs_upload.uploadId) {
                        console.log('kết quả trả về', rs_upload.uploadId);
                        all_rs_url.push(rs_upload.externalLink);
                      } else {
                        console.log('upload file thất bại');
                      }
                    } else {
                      all_rs_url.push(re_uoload.externalLink);
                    }
                  } catch (exce: any) {
                    console.log(exce.stack);
                    continue;
                  }
                }
              }
              console.log(all_rs_url);
              if (all_rs_url.length > 0) {
                const re_chapter_detail =
                  await this.chapterDetailService.findByLinkExternal(
                    element.url,
                  );
                if (!re_chapter_detail) {
                  const chapter = new ChapterDetail();
                  chapter.images = JSON.stringify(all_rs_url);
                  chapter.linkExternal = element.url;
                  chapter.name = element.text;
                  chapter.productDetailId = index.id;
                  chapter.projectId = 1;
                  await this.chapterDetailService.addOrUpdate(chapter);
                } else {
                  re_chapter_detail.name = element.text;
                  re_chapter_detail.images = JSON.stringify(all_rs_url);
                  await this.chapterDetailService.addOrUpdate(
                    re_chapter_detail,
                  );
                }
              }
              await page.close();
            } catch (exce: any) {
              console.log(exce.stack);
              console.log(index);
            }
          }
        }
      }
      await browser.close();
    } else {
      console.log('không tìm thấy chi tiết sản phẩm nào');
    }
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDevDto: UpdateDevDto) {
    return this.devService.update(+id, updateDevDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devService.remove(+id);
  }
}
