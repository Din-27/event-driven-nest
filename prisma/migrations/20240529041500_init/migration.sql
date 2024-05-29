-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_nama_produk_key" ON "Product"("nama_produk");
