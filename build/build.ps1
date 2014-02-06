param(
    [string[]]$tasks = "default",
    [hashtable]$properties = @{}
)

Remove-Module [p]sake
Import-Module Psake

Invoke-psake .\build.tasks.ps1 -properties $properties -taskList $tasks