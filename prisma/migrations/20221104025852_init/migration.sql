-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profile_photo" TEXT,
    "fullname" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "home_state" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cell_phone_contact" TEXT,
    "residential_phone_contact" TEXT,
    "campus_name" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "ra" INTEGER NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_ra_key" ON "users"("ra");
