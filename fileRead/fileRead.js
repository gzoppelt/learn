/**
 * Created by Not on 29/01/2015.
 */
if (window.File && window.FileReader && window.FileList && window.Blob) {
    function readSingleFile(evt) {
        //Retrieve the first (and only) file
        var f = evt.target.files[0];

        if (f) {
            var r = new FileReader();
            r.onload = function (e) {
                var contents = e.target.result;
                alert("Got the file:\n"
                + "name: " + f.name + "\n"
                + "type: " + f.type + "\n"
                + "size: " + f.size + "\n"
                + "starts with: " + contents.substr(1, contents.indexOf("\n"))
                );
            }
            r.readAsText(f);
        } else {
            alert("Failed to load file");
        }
    }
    document
        .getElementById('fileinput')
        .addEventListener('change', readSingleFile, false);
} else {
    alert('The File APIs are not fully supported by your browser.');
}