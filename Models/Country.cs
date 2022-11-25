using System;
using System.Collections.Generic;

namespace ASPnetCoreReact.Models;

public partial class Country
{
    public int Id { get; set; }

    public string? Code { get; set; }

    public string Name { get; set; } = null!;

    public string? Capital { get; set; }
}
