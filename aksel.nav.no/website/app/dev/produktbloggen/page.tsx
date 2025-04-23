import { notFound } from "next/navigation";
import { sanityFetch } from "@/app/_sanity/live";
import { BLOGG_LANDINGSSIDE_QUERY } from "@/app/_sanity/queries";
import { BloggList } from "./_ui/BloggList";
import { LatestBloggposts } from "./_ui/LatestBloggPosts";
import styles from "./_ui/Produktbloggen.module.css";

/* https://nextjs.org/docs/app/api-reference/file-conventions/page#props */
export default async function Page() {
  const { data: pageData } = await sanityFetch({
    query: BLOGG_LANDINGSSIDE_QUERY,
  });

  // const publishedAtRaw = pageData?.publishedAt ?? "";
  // const publishDate = await dateStr(publishedAtRaw);
  // const authors = (pageData?.contributors as any)?.map((x) => x?.title) ?? [];

  // const imageUrl = urlForImage(pageData[0]?.seo.image as Image)
  //   ?.quality(100)
  //   .url();

  if (!pageData?.bloggposts) {
    notFound();
  }

  const remainingPosts = pageData?.bloggposts?.slice(
    2,
    pageData?.bloggposts.length,
  );

  return (
    <>
      <main tabIndex={-1} id="hovedinnhold" className={styles.main}>
        <div className="mx-auto mb-40 grid w-full max-w-screen-2xl px-4 sm:px-6">
          <LatestBloggposts
            bloggs={pageData?.bloggposts}
            title="Produktbloggen"
            intro={pageData?.page?.intro}
          />

          {/* Flere blogger */}
          {remainingPosts && (
            <ul className="mt-8 grid gap-12 md:grid-cols-2">
              {remainingPosts.map((blogg) => (
                <BloggList blogg={blogg} key={blogg._id} />
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}
