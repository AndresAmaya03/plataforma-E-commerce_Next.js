export const revalidate = 60
import { getPaginationProductWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/interfaces";
import { redirect } from "next/navigation";


interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginationProductWithImages({ page, gender: gender as Gender })


  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }

  const labels: Record<string, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex'
  }
  
  // if (!['kid', 'men', 'women'].includes(id)) {
  //   notFound()
  // }


  return (
    <>
      <Title
        title={labels[gender]}
        subtitle="All procuts"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination
      totalPage={totalPages}
      />


    </>
  );
}