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

  if (!pageData?.bloggposts) {
    notFound();
  }

  const remainingPosts = pageData?.bloggposts?.slice(
    2,
    pageData?.bloggposts.length,
  );

  return (
    <>
      <div className={styles.bloggPosts}>
        <LatestBloggposts
          bloggs={pageData?.bloggposts}
          title="Produktbloggen"
          intro={pageData?.page?.intro}
        />

        {/* Flere blogger */}
        {remainingPosts && (
          <ul className={styles.remainingPosts}>
            {remainingPosts.map((blogg) => (
              <BloggList blogg={blogg} key={blogg._id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
