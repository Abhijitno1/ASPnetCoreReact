using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ASPnetCoreReact.Models;

public partial class DatabaseContext : DbContext
{
    public DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<CityView> CityViews { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<State> States { get; set; }

    /*
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=D:\\Pract\\Projects\\TestJSONReader\\WorldCities.mdf;Integrated Security=True;");
    */

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cities__3214EC07B518A146");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<CityView>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("CityView");

            entity.Property(e => e.CountryName).HasMaxLength(255);
            entity.Property(e => e.Latitude).HasColumnType("decimal(18, 10)");
            entity.Property(e => e.Longitude).HasColumnType("decimal(18, 10)");
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.StateName).HasMaxLength(255);
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Countrie__3214EC0762E37267");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Capital).HasMaxLength(255);
            entity.Property(e => e.Code)
                .HasMaxLength(35)
                .IsFixedLength();
            entity.Property(e => e.Name).HasMaxLength(255);
        });

        modelBuilder.Entity<State>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__States__3214EC0745BF7902");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Name).HasMaxLength(255);
            entity.Property(e => e.StateCode).HasMaxLength(35);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
