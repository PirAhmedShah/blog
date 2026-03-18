export function slugify(text: string): string {
    const slug = text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') //accents
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') //junk (no underscore)
        .trim()
        .replace(/\s+/g, '-') //spaces -> dash
        .replace(/-+/g, '-') //collapse dashes
        .replace(/^-+|-+$/g, ''); //trim dashes

    if (!slug) {
        throw new Error('Invalid slug input');
    }

    return slug;
}