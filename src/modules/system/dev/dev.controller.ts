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
import { DataObj } from 'src/common/class/data-obj.class';
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
    await this.listManga();
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
    const dataObj = {};
    for (const nameUrl of new_stkissmanga) {
      const fullUrl = `${nameUrl}`;
      console.log(`begin for ${fullUrl}`);
      await page.goto(fullUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      }); // check networkidle0 parameter and others here: https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-pagegotourl-options
      const manga = await page.$$eval(
        '.page-content-listing > .page-listing-item',
        (links) => {
          // Make sure the book to be scraped is in stock
          // Extract the links from the data
          return links.map((el) => ({
            title: el.querySelector('h3 > a').innerHTML,
            link: el.querySelector<HTMLLinkElement>('h3 > a').href,
            thumbnail_1: el.querySelector<HTMLImageElement>(
              '.item-thumb > a > img',
            ).src,
          }));
        },
      );
      if (manga) {
        console.log(manga);
      }
    }
    await page.close();
    await browser.close();
  }

  private async detailManga(browser, link?: string) {
    const page = await browser.newPage();

    const dataObj = {};
    // Navigate to the selected page
    await page.goto('https://1stkissmanga.me/manga/seoul-station-druid/');
    // Wait for the required DOM to be rendered
    // Get the link to all the required books
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
    dataObj['content'] = await page.$eval(
      'div.summary__content',
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
      }));
    });
    dataObj['genres'] = Genres;
    dataObj['chapter'] = chapter;
    console.log(dataObj);
    page.close();
  }
  private async chapterManga(browser, link?: string) {
    const page = await browser.newPage();
    const dataObj = {};
    // Navigate to the selected page
    await page.goto(
      'https://1stkissmanga.me/manga/seoul-station-druid/chapter-94/',
    );
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
    page.close();
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
