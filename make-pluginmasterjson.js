const fs = require("fs");
var execSync = require("child_process").execSync;

const API_LEVEL = 6;
/*
 {
        "Author": "aRkker",
        "Name": "World Map Enhancer",
        "InternalName": "WorldMapEnhancer",
        "AssemblyVersion": "1.0.0.1",
        "Description": "Simply zoom out by right clicking the world map, like God intended it",
        "ApplicableVersion": "any",
        "Tags": [
            "world",
            "map",
            "enhance",
            "rightclick",
            "zoom"
        ],
        "DalamudApiLevel": 6,
        "LoadPriority": 0,
        "Punchline": "Right click to zoom out the big map",
        "IsHide": "False",
        "IsTestingExclusive": "False",
        "DownloadCount": 0,
        "CategoryTags": [
            "utility",
            "other",
            "ui"
        ],
        "LastUpdate": "1651838531",
        "DownloadLinkInstall": "https://raw.githubusercontent.com/aRkker/DalamudPlugins/master/plugins/WorldMapEnhancer/latest.zip",
        "DownloadLinkTesting": "https://raw.githubusercontent.com/aRkker/DalamudPlugins/master/plugins/WorldMapEnhancer/latest.zip",
        "DownloadLinkUpdate": "https://raw.githubusercontent.com/aRkker/DalamudPlugins/master/plugins/WorldMapEnhancer/latest.zip"
    }

*/

fs.readdir("./plugins", (err, files) => {
  const categoryFallbacks = JSON.parse(fs.readFileSync("./categoryfallbacks.json").toString());

  let masterJson = [];
  for (let d of files) {
    console.log(d);
    const pluginJsonPath = `plugins/${d}/${d}.json`;

    const pluginJson = JSON.parse(fs.readFileSync(pluginJsonPath).toString());

    console.log(pluginJson);

    const updatedDate = execSync(`git log -1 --pretty="format:%ct" plugins/${pluginJson.InternalName}/latest.zip`).toString();

    const masterJsonInsert = {
      ...pluginJson,
      LastUpdate: updatedDate,
      IsHide: "False",
      DownloadCount: 69420,
      IsTestingExclusive: "False",
      CategoryTags: pluginJson.CategoryTags ?? categoryFallbacks[pluginJson.InternalName],
      DownloadLinkInstall: `https://raw.githubusercontent.com/aRkker/DalamudPlugins/master/plugins/${pluginJson.InternalName}/latest.zip`,
      DownloadLinkTesting: `https://raw.githubusercontent.com/aRkker/DalamudPlugins/master/plugins/${pluginJson.InternalName}/latest.zip`,
      DownloadLinkUpdate: `https://raw.githubusercontent.com/aRkker/DalamudPlugins/master/plugins/${pluginJson.InternalName}/latest.zip`,
    };

    masterJson.push(masterJsonInsert);
    console.log(masterJsonInsert);
  }

  fs.writeFileSync("./pluginmaster.json", JSON.stringify(masterJson, null, 2));
});
