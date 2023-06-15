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

    await this.chapterManga();
    // const rs_url = await this.uploadService.add(
    //   [],
    //   'https://1stkissmanga.me/wp-content/uploads/thumb_5d759400c4427-10220-110x150.jpg',
    // );
    // console.log(rs_url);
  }
  private async cateManga() {
    const browser = await puppeteer.launch();
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
    const browser = await puppeteer.launch();
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
      if (re_uoload.length == 0) {
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
        console.log('tệp bị trùng lặp');
      }
    }

    await page.close();
    await browser.close();
  }

  private async detailManga() {
    const list = await this.productsService.findAll();
    if (list.length > 0) {
      const dataObj = {};
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      for (const index of list) {
        const fullUrl = `${index.linkExternal}`;
        console.log(`begin for ${fullUrl}`);
        await page.goto(fullUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 30000,
        }); // check networkidle0 parameter and others here: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagegotourl-options
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
        const Genres = await page.$$eval('div.genres-content > a', (links) => {
          // Make sure the book to be scraped is in stock
          // Extract the links from the data
          return links.map((el) => ({
            text: el.innerText,
            url: el.href,
          }));
        });
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
          if (re_uoload.length == 0) {
            rs_url = await this.uploadService.add([], dataObj['thumbnail_2']);
          }
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
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      for (const index of list) {
        if (index.chapters) {
          const list_chapters = JSON.parse(index.chapters);
          const dataObj = {};
          for (let index_1 = 0; index_1 < list_chapters.length; index_1++) {
            const element = list_chapters[index_1];
            // Navigate to the selected page
            await page.goto(element.url);
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
                  url: el.querySelector('img').src,
                }));
                return item_img;
              },
            );
            dataObj['imgs'] = Imgs;
            console.log(dataObj);
            const all_rs_url = [];
            if (Imgs) {
              Imgs.forEach(async (item) => {
                const re_uoload = await this.uploadService.findByName(item.url);
                console.log(re_uoload);
                if (re_uoload.length == 0) {
                  const rs_url = await this.uploadService.add([], item.url);
                  console.log('kết quả trả về', rs_url);
                  all_rs_url.push(...rs_url);
                }
              });
            }
            console.log(all_rs_url);
            return;
          }
        }
        await page.close();
        await browser.close();
      }
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
