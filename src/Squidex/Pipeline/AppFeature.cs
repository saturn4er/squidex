// ==========================================================================
//  AppFeature.cs
//  Squidex Headless CMS
// ==========================================================================
//  Copyright (c) Squidex Group
//  All rights reserved.
// ==========================================================================

using System;

namespace Squidex.Pipeline
{
    public sealed class AppFeature : IAppFeature
    {
        public Guid AppId { get; }

        public AppFeature(Guid appId)
        {
            AppId = appId;
        }
    }
}