using System;
using System.Collections.Generic;

namespace ASPnetCoreReact.Models;

public partial class CityView
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public decimal? Longitude { get; set; }

    public decimal? Latitude { get; set; }

    public int? StateId { get; set; }

    public int? CountryId { get; set; }

    public string StateName { get; set; } = null!;

    public string CountryName { get; set; } = null!;
}
