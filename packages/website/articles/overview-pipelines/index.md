The xeokit SDK supports viewing various AEC file formats through multiple import pipelines. 

The best pipeline to use depends on the source format and file size.

The table below outlines the recommended pipeline based on format and data size. Smaller files can be loaded directly
into the xeokit Viewer while medium/large files should be preconverted to a more 
compact format, such as to XGF, for optimal
performance. The links on the right take you to the tutorials for the selected pipelines.

<br>

<table class="table table-striped table-bordered table-hover">
  <thead class="thead-dark">
    <tr>
      <th>Model Format</th>
      <th>File Size</th>
      <th>Load Directly vs. Preconvert</th>
      <th>Recommended Articles</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4"><b style="font-size: 20px;">IFC</b></td>
      <td rowspan="2" style="background-color:#90ee9073">0MB - 10MB</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadWebIFC_IfcOpenHouse4/">Viewing IFC using loadWebIFC</a>
      </td>
    </tr>
    <tr>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/webifc2xgf/">Importing IFC using webifc2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:lightyellow">10MB - 100MB</td>
      <td>Preconvert</td>
      <td>
        <a href="">Importing IFC using ifc2gltf</a><br>
        <a href="">Importing IFC using ifc2gltf2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">100MB - 2GB</td>
      <td>Preconvert</td>
      <td>
        <a href="">Importing IFC using ifc2gltf2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="2"><b style="font-size: 20px;">glTF</b></td>
      <td rowspan="1" style="background-color:#90ee9073">Small</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadGLTF_MAP/">Viewing glTF using loadGLTF</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">Medium / Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/gltf2xgf/">Importing glTF using gltf2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="2"><b style="font-size: 20px;">.BIM</b></td>
      <td style="background-color:#90ee9073">Small</td>
      <td>Load Directly</td>
      <td><a href="@@base/articles/example_loadDotBIM_BlenderHouse/">Viewing .BIM using loadDotBIM</a>
      </td>
    </tr>
    <tr>
      <td style="background-color:#ffa50047">Medium / Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/dotbim2xgf/">Importing .BIM using dotbim2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="3"><b style="font-size: 20px;">CityJSON</b></td>
      <td rowspan="2" style="background-color:#90ee9073">Small</td>
      <td>Load Directly</td>
      <td>
        <a href="@@base/articles/example_loadCityJSON_Railway/">Viewing CityJSON using loadCityJSON</a>
      </td>
    </tr>
    <tr>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/cityjson2xgf/">Importing CityJSON using cityjson2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">Medium / Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/cityjson2xgf/">Importing CityJSON using cityjson2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="3"><b style="font-size: 20px;">LAS/LAZ</b></td>
      <td rowspan="2" style="background-color:#90ee9073">Small / Medium</td>
      <td>Load Directly</td>
      <td>
        <a href="">Viewing LAS/LAZ using loadLAS</a>
      </td>
    </tr>
    <tr>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/las2xgf/">Importing LAS using las2xgf</a>
      </td>
    </tr>
    <tr>
      <td rowspan="1" style="background-color:#ffa50047">Large</td>
      <td>Preconvert</td>
      <td>
        <a href="@@base/articles/las2xgf/">Importing LAS using las2xgf</a>
      </td>
    </tr>
    <tr>
      <td><b style="font-size: 20px;">XKT</b></td>
      <td style="background-color:#90ee9073">All Sizes</td>
      <td>Load Directly</td>
      <td><a href="">Viewing XKT using loadXKT</a></td>
    </tr>
    <tr>
      <td><b style="font-size: 20px;">XGF</b></td>
      <td style="background-color:#90ee9073">All Sizes</td>
      <td>Load Directly</td>
      <td><a href="">Viewing XGF using loadXGF</a></td>
    </tr>
  </tbody>
</table>
