<?php
$dir = getcwd();

if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
        $nav_file_name = "paths.json";
        if(file_exists($nav_file_name)) unlink($nav_file_name);
        $filenames = [];

        while (($fileName = readdir($dh)) !== false) {
            if($fileName=='.' || $fileName=='..') continue;
            $file = new SplFileInfo($fileName);
            $extension = $file->getExtension();
            if(is_file($fileName) && $extension == "json") $filenames[] = $fileName;
        }
        closedir($dh);

        $new_paths = [];
        foreach ($filenames as $fileName) {
            $file = file_get_contents($fileName);
            $data = json_decode($file, true);
            $path = [];
            $path["navTitle"] = $data["title"];
            if (array_key_exists("children", $data)) {
                if ($data["children"]) {
                    $children = [];
                    foreach ($data["list"] as $list_item) {
                        $children[] = $list_item[0]["title"];
                    }
                    $path["children"] = $children;
                } else {
                    $path["children"] = false;
                }
            } else {
                $path["children"] = false;
            }
            $key = stristr($fileName, ".", true);
            $new_paths[$key] = $path;
        }
        $new_paths_json = json_encode($new_paths, JSON_UNESCAPED_UNICODE);
        file_put_contents($nav_file_name, $new_paths_json);
    }
}
