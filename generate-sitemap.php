<?php
$baseUrl = 'https://vinkand.com';
$pages = [
    ['url' => '/', 'priority' => '1.0', 'changefreq' => 'daily'],
    ['url' => '/about.html', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['url' => '/projects.html', 'priority' => '0.9', 'changefreq' => 'weekly']
];

header('Content-Type: application/xml; charset=utf-8');
echo '<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL;
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <?php foreach($pages as $page): ?>
    <url>
        <loc><?= $baseUrl . $page['url'] ?></loc>
        <lastmod><?= date('Y-m-d') ?></lastmod>
        <changefreq><?= $page['changefreq'] ?></changefreq>
        <priority><?= $page['priority'] ?></priority>
    </url>
    <?php endforeach; ?>
</urlset> 