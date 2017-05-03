<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <title>Test</title>
    <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="my.css" rel="stylesheet">
</head>
<body>
<div class="container" role="main">
    <div class="page-header">
        <h1>MENU TEST</h1>
    </div>
    <div class="row mytask">
        <form class="form-inline addnew">
            <div class="form-group">
                <label for="addname">Name</label> <input class="form-control" id="addname" placeholder="Type please"
                                                         type="text">
                <button class="btn btn-default" onclick="toelem()" type="button">add to parent</button>
            </div>
        </form>
        <div class="col-sm-6" id="mymenu"></div>
    </div>
    <div class="modal fade edit" role="dialog" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Edit</h4>
                </div>
                <div class="modal-body">
                    <form class="form-inline">
                        <div class="form-group rename">
                            <label for="torename">Name</label> <input class="form-control" id="torename" placeholder=""
                                                                      type="text">
                            <button class="btn btn-primary" onclick="save()" type="button">Rename</button>
                        </div>
                    </form>
                    <ul>
                        <li data-id="-1">
                            <button class="btn btn-default btn-sm getchild" type="button"><span aria-hidden="true"
                                                                                                class="glyphicon glyphicon glyphicon-folder-open"></span>
                            </button>
                            Root
                            <div id="tempmenu"></div>
                        </li>
                    </ul>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</div><!-- /container -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
</script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">
</script>
<script src="my4.js">
</script>
</body>
</html>