
## 📚 What is a Manga File (The `.cbz` Format)?

A manga file, typically carrying the **`.cbz`** extension, is the standard format used by digital comic and manga readers like Kavita.

### Structure and Contents

A `.cbz` file is simply a **ZIP archive** that has been renamed. Inside this archive, you will find:

1.  **Ordered Image Files:** Individual image files (e.g., `.jpg`, `.png`) representing the pages of a single chapter, named sequentially (e.g., `001.jpg`, `002.jpg`).
2.  **Metadata (`ComicInfo.xml`):** A crucial XML file that contains structured information about the file, such as the series title, chapter number, author, publisher, and summary. This metadata allows Kavita to correctly organize and display the content.
3.  **Cover Image (Optional):** Often, a dedicated `cover.png` or `cover.jpg` file is included, though Kavita can usually generate a cover from the first page image.

### Organization for Readers

For applications like Kavita or Komga to recognize and correctly group your library, manga files must follow a strict folder hierarchy:

> `[Manga Title] / [Volume Number] / [Chapter File].cbz`

For example:

`Hunter x Hunter / Volume 3 / Hunter x Hunter - c031.cbz`

This organizational structure allows the reader application to sort and present your collection correctly by series, volume, and chapter.