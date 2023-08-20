import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CategoriesService } from '../categories/categories.service';
import { ChapterDetailService } from '../chapter_detail/chapter_detail.service';
import { DevService } from '../dev/dev.service';
import { GenresService } from '../genres/genres.service';
import { ProductDetailsService } from '../product_details/product_details.service';
import { ProductsService } from '../products/products.service';
import { ProjectsService } from '../projects/projects.service';
import { UploadService } from '../upload/upload.service';
import puppeteer from 'puppeteer';
import { Category } from '../categories/entities/category.entity';
import { Product } from '../products/entities/product.entity';
import { Helper } from 'src/common/utils/helper';
import { COUNTRIES } from 'src/common/utils/country';

@Controller('system/clone-visana')
@Public()
export class CloneVisanaController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly genresService: GenresService,
    private readonly productDetailsService: ProductDetailsService,
    private readonly projectsService: ProjectsService,
    private readonly uploadService: UploadService,
    private readonly chapterDetailService: ChapterDetailService,
    @InjectRedis()
    private readonly redis: Redis,
  ) {}

  @Get('list')
  async findAll() {
    await this.countries();
  }
  async countries() {
    for (let index = 1; index < COUNTRIES.length; index++) {
      const element = COUNTRIES[index];
      const rs_url: any = await this.uploadService.add(
        [],
        `https://purecatamphetamine.github.io/country-flag-icons/3x2/${element.value}.svg`,
      );
      console.log(rs_url);
    }
  }
  async product_lamhochieunhanh() {
    // const img =
    //   'https://hochieunhanh.vn/wp-content/uploads/2023/06/tra-so-can-cuoc-cong-dan-online-300x169.png';
    // const filename = img.substring(img.lastIndexOf('/') + 1);
    // console.log(filename);
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    const array_item = [];
    for (let index = 1; index < 24; index++) {
      console.log(`https://hochieunhanh.vn/tin-tuc/page/${index}`);
      await page.goto(`https://hochieunhanh.vn/tin-tuc/page/${index}`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      const manga: any = await page.$$eval(
        '#content > div > div.large-9.col > div > .post-item',
        (links) => {
          // Make sure the book to be scraped is in stock
          // Extract the links from the data
          return links.map((el) => ({
            title: el.querySelector('h5').innerText,
            link: el.querySelector<HTMLLinkElement>('a').href,
            img:
              el
                .querySelector<HTMLImageElement>(
                  'a > div > div.box-image > div img',
                )
                ?.getAttribute('data-lazy-src') || '',
            alt_imge: el.querySelector<HTMLImageElement>('a img')?.alt || '',
            desc_short: el
              .querySelector<HTMLDivElement>('.from_the_blog_excerpt')
              .innerText.trim(),
          }));
        },
      );
      array_item.push(...manga);
    }
    console.log(array_item);
    if (array_item.length > 0) {
      for (let index = 0; index < array_item.length; index++) {
        const element = array_item[index];
        console.log(element);
        console.log(element.img.lastIndexOf('/'));
        const filename = element.img.substring(
          element.img.lastIndexOf('/') + 1,
        );
        console.log(filename);
        if (filename) {
          const re_uoload = await this.uploadService.findByName(filename);
          if (!re_uoload) {
            const rs_url: any = await this.uploadService.add([], element.img);
            if (rs_url) {
              console.log(rs_url);
              const search_product = await this.productsService.findByLink(
                element.link,
              );
              if (search_product.length == 0) {
                // const search_cate = await this.categoriesService.findByLink(
                //   dataObj[item].link_cat,
                // );
                const product = new Product();
                const title = element.title.split('-')[0].trim();
                product.name = title;
                product.slug = Helper.convertToSlug(title);
                product.projectId = 1;
                product.linkExternal = element.link;
                product.imageThumnail = JSON.stringify({
                  src: rs_url[0].externalLink,
                  alt: element.alt_imge,
                });
                product.descShort = element.desc_short;
                //  product.categoryId = search_cate ? search_cate.id : null;
                const rs_product = await this.productsService.addOrUpdate(
                  product,
                );
                console.log(rs_product);
              } else {
                console.log('sản phẩm bị trùng lặp');
              }
            }
          }
        }
      }
    }
    await page.close();
    await browser.close();
  }
}
