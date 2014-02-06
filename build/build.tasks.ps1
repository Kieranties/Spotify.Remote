Properties {
    $userProfileRoot = $env:USERPROFILE
    $appName = "Spotify.Remote"
    $appRoot = "$PSScriptRoot\..\app"
}

Task Default -depends App.Deploy

Task App.Deploy -description "Deploys app to destination" `
    -requiredVariables userProfileRoot,appName,appRoot `
    -depends App.Build.Destination {

    $destination = Format-AppDestination

    Get-ChildItem $appRoot |
        Copy-Item -Destination $destination -Recurse
}

Task App.Build.Destination -description "Creates the directory the spotify app must reside in" `
    -requiredVariables userProfileRoot,appName `
    -depends App.Teardown {

    mkdir (Format-AppDestination) | Out-Null
}

Task App.Teardown -description "Destroys any existing app build" `
    -requiredVariables userProfileRoot,appName {

    Format-AppDestination | 
        ? { Test-Path $_ } | 
        rmdir -Recurse -Force | 
        Out-Null
}

Function Format-AppDestination{
    "$userProfileRoot\Documents\Spotify\$appName"
}