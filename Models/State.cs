using System;
using System.Collections.Generic;

namespace ASPnetCoreReact.Models;

public partial class State
{
    public int Id { get; set; }

    public string? StateCode { get; set; }

    public string Name { get; set; } = null!;

    public int? CountryId { get; set; }
}
