import { ProductGrid, Title } from "@/components";
import { Product, Gender } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const seedProducts = initialData.products

interface Props {
  params: {
    id: Gender;
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const products = seedProducts.filter(product => product.gender === id)

  const labels: Record<Gender, string> = {
    'men': 'Men',
    'women': 'Women',
    'kid': 'Kids',
    'unisex': 'Unisex'
  }
  
  if (!['kid', 'men', 'women'].includes(id)) {
    notFound()
  }


  return (
    <>
      <Title
        title={labels[id]}
        subtitle="All procuts"
        className="mb-2"
      />

      <ProductGrid products={products} />


    </>
  );
}